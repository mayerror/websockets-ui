import type Player from "./player";

class Room {
  players: Player[];
  id: number;
  currentTurn: number;
  lastAttackSuccess: boolean;

  constructor(player: Player, id: number) {
    this.players = [player];
    this.id = id;
    this.currentTurn = player.id;
    this.lastAttackSuccess = false;
  }

  gameIsOn(): boolean {
    return this.players.length === 2;
  }

  shipsLaunched(): boolean {
    return this.players.every((player) => player.ships?.length === 10);
  }

  changeTurnId(): void {
    if (!this.lastAttackSuccess) {
      const player = this.players.find((player) => player.id !== this.currentTurn);
      if (player !== undefined) {
        this.currentTurn = player.id;
      }
    }
  }
}

export default Room;
