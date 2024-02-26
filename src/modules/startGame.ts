import type Room from "../types/room";
import createAnswer from "../utils/createAnswer";

function startGame(room: Room, clientId: number): string {
  const data = {
    ships: room.players.find((player) => player.id === clientId)?.ships,
    currentPlayerIndex: clientId
  };
  return createAnswer("start_game", data);
}

export default startGame;
