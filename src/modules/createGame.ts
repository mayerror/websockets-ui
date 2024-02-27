import createAnswer from "../utils/createAnswer";
import type Room from "../types/room";

function createGame(room: Room, id: number): string {
  const data = {
    idGame: room.id,
    idPlayer: id
  };

  return createAnswer("create_game", data);
}

export default createGame;
