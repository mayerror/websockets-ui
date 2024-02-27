import WebSocket from "ws";
import type Room from "../types/room";
import { type MyWebSocket } from "../types";
import createGame from "../modules/createGame";
import startGame from "../modules/startGame";
import attackFeedback from "../modules/attackFeedback";
import setTurn from "../modules/setTurn";

function specBroadcast(wsClients: MyWebSocket[], room: Room, SW: "CG" | "SG" | "ST" | "AF"): void {
  wsClients
    .filter((client) => room?.players.find((player) => player.id === client.id))
    .forEach((client) => {
      if (client.readyState === WebSocket.OPEN && room !== undefined) {
        if (SW === "CG") {
          client.send(createGame(room, client.id));
        } else if (SW === "SG") {
          client.send(startGame(room, client.id));
        } else if (SW === "ST") {
          client.send(setTurn(room));
        } else if (SW === "AF") {
          client.send(attackFeedback(room, client.id));
        }
      }
    });
}

export default specBroadcast;
