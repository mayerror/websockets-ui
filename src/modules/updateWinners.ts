import createAnswer from "../utils/createAnswer";
import type Player from "../types/player";

function updateWinners(players: Player[]): string {
  if (players.length > 0) {
    const winners = players
      .sort((a, b) => a.wins - b.wins)
      .map((player) => {
        return { name: player.name, wins: player.wins };
      });
    return createAnswer("update_winners", winners);
  }
  return "";
}

export default updateWinners;
