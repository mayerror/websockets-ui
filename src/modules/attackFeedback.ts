import type Room from "../types/room";
import createAnswer from "../utils/createAnswer";

function attackFeedback(room: Room, id: number): string {
  const attackerId = room.currentTurn;
  const enemyId = room.players.find((player) => player.id !== attackerId)?.id;
  const answer = {
    position: {
      x: room.x,
      y: room.y
    },
    currentPlayer: enemyId,
    status: room.lastAttack
  };
  if (id === attackerId) {
    answer.currentPlayer = attackerId;
  } else {
    answer.currentPlayer = attackerId;
  }
  return createAnswer("attack", answer);
}

export default attackFeedback;
