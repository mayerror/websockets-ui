import createAnswer from "../utils/createAnswer";
import Game from "../utils/game";
import type Player from "../utils/player";
import { generateUniqID } from "./registerPlayer";

function createGame(player: Player, games: Game[]): string {
  const gameID = generateUniqID(games);
  const game = new Game(player, gameID);

  games.push(game);

  const data = {
    idGame: game.id,
    idPlayer: player.id
  };

  return createAnswer("create_game", data);
}

export default createGame;
