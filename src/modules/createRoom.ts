import Room from "../utils/room";
import type Player from "../utils/player";
import { generateUniqID } from "./registerPlayer";

function createRoom(player: Player, roomes: Room[]): void {
  const roomID = generateUniqID(roomes);
  const game = new Room(player, roomID);

  roomes.push(game);
}

export default createRoom;
