import type Room from "../types/room";
import createAnswer from "../utils/createAnswer";

function setTurn(room: Room): string {
  const data = {
    currentPlayer: room.currentTurn
  };

  return createAnswer("turn", data);
}

export default setTurn;
