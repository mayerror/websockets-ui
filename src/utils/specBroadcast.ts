import WebSocket from "ws";
import type Room from "../types/room";
import { type MyWebSocket } from "../types";
import createGame from "../modules/createGame";
import startGame from "../modules/startGame";

function specBroadcast(wsClients: MyWebSocket[], room: Room, SW: "CG" | "SG"): void {
  wsClients
    .filter((client) => room?.players.find((player) => player.id === client.id))
    .forEach((client) => {
      if (client.readyState === WebSocket.OPEN && room !== undefined) {
        if (SW === "CG") {
          client.send(createGame(room, client.id));
        } else if (SW === "SG") {
          client.send(startGame(room, client.id));
        }
      }
    });
}

export default specBroadcast;
