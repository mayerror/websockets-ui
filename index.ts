import { WebSocketServer, WebSocket } from "ws";
import { httpServer } from "./src/http_server";
import { type WsAnswer } from "./src/types";
import type Player from "./src/utils/player";
import middleware from "./src/utils/middleware";
import registerPlayer from "./src/modules/registerPlayer";
import updateWinners from "./src/modules/updateWinners";

const HTTP_PORT = 8181;
const WS_PORT = 3000;

const wss = new WebSocketServer({ port: WS_PORT });
export const players: Player[] = [];

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  // broadcasting
  // ws.on("message", (data, isBinary) => {
  //   clients.forEach(function each(client) {
  //     if (client !== ws && client.readyState === WebSocket.OPEN) {
  //       client.send(data, { binary: isBinary });
  //     }
  //   });
  // });
  ws.on("message", (message, isBinary) => {
    try {
      if (!isBinary && Buffer.isBuffer(message)) {
        const { type, data }: WsAnswer = JSON.parse(message.toString("utf8"));

        if (type.length > 0) {
          switch (type) {
            case "reg":
              ws.send(registerPlayer(data, players));
              wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(updateWinners(players));
                }
              });
              break;

            default:
              break;
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  });

  ws.on("message", (data) => {
    middleware(wss, data);
  });

  console.log(`Start websocket server on the ${WS_PORT} port!`);
});

httpServer.listen(HTTP_PORT);
console.log(`Start static http server on the ${HTTP_PORT} port!`);
