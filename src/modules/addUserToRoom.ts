import type Player from "../types/player";
import type Room from "../types/room";

function addUserToRoom(data: string, roomes: Room[], player: Player): Room | undefined {
  const { indexRoom } = JSON.parse(data);
  const room = roomes.find((room) => room.id === indexRoom);
  if (room !== undefined && room.players.length === 1 && room.players[0].id !== player.id) {
    room.players.push(player);
    return room;
  }
  return undefined;
}

export default addUserToRoom;
