import type Room from "../types/room";

function handleAttack(data: string, roomes: Room[]): Room | undefined {
  const {
    indexPlayer,
    gameId,
    x,
    y
  }: { indexPlayer: number; gameId: number; x: number; y: number } = JSON.parse(data);
  const room = roomes.find((room) => room.id === gameId);
  if (room !== undefined) {
    if (indexPlayer === room.currentTurn) {
      room.checkAttack(indexPlayer, x, y);
    }
  }
  return room;
}

export default handleAttack;
