import type Room from "../types/room";
import type Ship from "../types/ship";

function addShips(data: string, roomes: Room[]): Room | undefined {
  const { gameId, ships, indexPlayer }: { gameId: number; ships: Ship[]; indexPlayer: number } =
    JSON.parse(data);
  const room = roomes.find((room) => room.id === gameId);
  if (room !== undefined) {
    const player = room.players.find((player) => player.id === indexPlayer);
    if (player !== undefined) {
      player.ships = ships;
    }
    return room;
  }
  return undefined;
}

export default addShips;
