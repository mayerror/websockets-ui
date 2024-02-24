import { httpServer } from "./src/http_server";
import { RawData, WebSocketServer, WebSocket } from "ws";
import * as http from "http";
import middleware from "./src/http_server/utils/middleware";
import { WsAnswer } from "./src/types";
import Player from "./src/http_server/utils/player";

const HTTP_PORT = 8181;

const wss = new WebSocketServer({ port: 3000 });
const players: Array<Player> = [];

wss.on("connection", (ws) => {
  const clients = wss.clients;
  ws.on("error", console.error);

  //broadcasting
  // ws.on("message", (data, isBinary) => {
  //   clients.forEach(function each(client) {
  //     if (client !== ws && client.readyState === WebSocket.OPEN) {
  //       client.send(data, { binary: isBinary });
  //     }
  //   });
  // });
  ws.on("message", (message) => {
    console.log(message);
    try {
      const { type, data }: WsAnswer = JSON.parse(message.toString());
      // const { type, data }: WsAnswer = JSON.parse(message as unknown as string);

      if (type) {
        switch (type) {
          case "reg":
            const { name, password } = JSON.parse(data);
            if (typeof name === "string" && typeof password === "string") {
              let id = 0;
              while (true) {
                id = Math.floor(Math.random() * 1000);
                if (!players.some((player) => player.id === id)) {
                  break;
                }
              }
              players.push(new Player(name, password, id));
              console.log(JSON.stringify(players));
            }
            break;

          default:
            break;
        }
      }
    } catch (error) {
      console.error(error);
    }
  });

  ws.on("message", (data) => {
    middleware(wss, data);
  });

  console.log("Connection established");
});

httpServer.listen(HTTP_PORT);
console.log(`Start static http server on the ${HTTP_PORT} port!`);
