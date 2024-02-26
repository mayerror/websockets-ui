import Room from "../types/room";
import type Player from "../types/player";
import { generateUniqID } from "./registerPlayer";

function createRoom(player: Player, roomes: Room[]): void {
  const roomID = generateUniqID(roomes);
  const game = new Room(player, roomID);

  roomes.push(game);
}

export default createRoom;
