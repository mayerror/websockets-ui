import type Player from "./player";

class Room {
  players: Player[];
  id: number;

  constructor(player: Player, id: number) {
    this.players = [player];
    this.id = id;
  }
}

export default Room;
