import type Room from "../types/room";
import createAnswer from "../utils/createAnswer";

function finishGame(room: Room): string {
  const data = {
    winPlayer: room.winner
  };

  return createAnswer("finish", data);
}

export default finishGame;
