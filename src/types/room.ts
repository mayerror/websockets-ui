import type Player from "./player";

class Room {
  players: Player[];
  id: number;

  constructor(player: Player, id: number) {
    this.players = [player];
    this.id = id;
  }

  gameIsOn(): boolean {
    return this.players.length === 2;
  }
}

export default Room;
