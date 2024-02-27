import type Player from "../types/player";

function getPlayerById(players: Player[], id: number): Player | undefined {
  return players.find((player) => player.id === id);
}

export default getPlayerById;
