import type Player from "./player";

class Game {
  players: Player[];
  id: number;

  constructor(player: Player, id: number) {
    this.players = [player];
    this.id = id;
  }
}

export default Game;
