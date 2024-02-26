import { WebSocketServer } from "ws";
import { httpServer } from "./src/http_server";
import { type MyWebSocket, type WsAnswer } from "./src/types";
import type Player from "./src/utils/player";
import type Room from "./src/utils/room";
import middleware from "./src/utils/middleware";
import registerPlayer from "./src/modules/registerPlayer";
import updateWinners from "./src/modules/updateWinners";
import createRoom from "./src/modules/createRoom";
import updateRoom from "./src/modules/updateRoom";
import broadcast from "./src/utils/broadcast";
import getPlayerById from "./src/utils/getPlayerById";
import addUserToRoom from "./src/modules/addUserToRoom";
import specBroadcast from "./src/utils/specBroadcast";

const HTTP_PORT = 8181;
const WS_PORT = 3000;

const wss = new WebSocketServer({ port: WS_PORT }, () => {
  console.log(`Start websocket server on the ${WS_PORT} port!`);
});

export const players: Player[] = [];
export const roomes: Room[] = [];
const wsClients: MyWebSocket[] = [];

wss.on("connection", (ws: MyWebSocket) => {
  wsClients.push(ws);
  // ws.on("close", () => {

  // });
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
            case "reg": {
              ws.send(registerPlayer(data, players, ws));
              broadcast(wss, updateWinners(players));
              broadcast(wss, updateRoom(roomes));
              break;
            }
            case "create_room": {
              const player = getPlayerById(players, ws.id);
              if (player !== undefined) {
                createRoom(player, roomes);
                broadcast(wss, updateRoom(roomes));
              }
              break;
            }
            case "add_user_to_room": {
              const player = getPlayerById(players, ws.id);
              if (player !== undefined) {
                const room = addUserToRoom(data, roomes, player);
                if (room !== undefined) {
                  specBroadcast(wsClients, room);
                }
              }
              break;
            }
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
