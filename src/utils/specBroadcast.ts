import WebSocket from "ws";
import type Room from "../types/room";
import { type MyWebSocket } from "../types";
import createGame from "../modules/createGame";

function specBroadcast(wsClients: MyWebSocket[], room: Room): void {
  wsClients
    .filter((client) => room?.players.find((player) => player.id === client.id))
    .forEach((client) => {
      if (client.readyState === WebSocket.OPEN && room !== undefined) {
        client.send(createGame(room, client.id));
      }
    });
}

export default specBroadcast;
