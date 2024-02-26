import type Player from "./player";

function getPlayerById(players: Player[], id: number): Player | undefined {
  return players.find((player) => player.id === id);
}

export default getPlayerById;
