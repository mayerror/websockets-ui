import { WebSocketServer, WebSocket } from "ws";
import { httpServer } from "./src/http_server";
import { type MyWebSocket, type WsAnswer } from "./src/types";
import type Player from "./src/utils/player";
import type Game from "./src/utils/game";
import middleware from "./src/utils/middleware";
import registerPlayer from "./src/modules/registerPlayer";
import updateWinners from "./src/modules/updateWinners";
import createGame from "./src/modules/createGame";

const HTTP_PORT = 8181;
const WS_PORT = 3000;

const wss = new WebSocketServer({ port: WS_PORT }, () => {
  console.log(`Start websocket server on the ${WS_PORT} port!`);
});

export const players: Player[] = [];
export const games: Game[] = [];

wss.on("connection", (ws: MyWebSocket) => {
  ws.on("error", console.error);
  ws.on("message", (data) => {
    middleware(wss, data);
  });
  ws.on("message", (message, isBinary) => {
    try {
      if (!isBinary && Buffer.isBuffer(message)) {
        const { type, data }: WsAnswer = JSON.parse(message.toString("utf8"));

        if (type.length > 0) {
          switch (type) {
            case "reg":
              ws.send(registerPlayer(data, players, ws));
              wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(updateWinners(players));
                }
              });
              break;
            case "create_room":
              console.log(ws.id);
              // eslint-disable-next-line no-case-declarations
              const player = players.filter((player) => player.id === ws.id)[0];
              ws.send(createGame(player, games));
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
});

httpServer.listen(HTTP_PORT);
console.log(`Start static http server on the ${HTTP_PORT} port!`);
