import type Room from "../types/room";

function handleAttack(data: string, roomes: Room[]): Room | undefined {
  const {
    indexPlayer,
    gameId,
    x,
    y
  }: { indexPlayer: number; gameId: number; x?: number; y?: number } = JSON.parse(data);
  const room = roomes.find((room) => room.id === gameId);
  if (room !== undefined) {
    if (indexPlayer === room.currentTurn) {
      if (x !== undefined && y !== undefined) {
        room.checkAttack(indexPlayer, x, y);
      } else {
        const xR = Math.floor(Math.random() * 10);
        const yR = Math.floor(Math.random() * 10);
        room.checkAttack(indexPlayer, xR, yR);
      }
    }
  }
  return room;
}

export default handleAttack;
