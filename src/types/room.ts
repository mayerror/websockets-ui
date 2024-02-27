import type Player from "./player";

class Room {
  players: Player[];
  id: number;
  currentTurn: number;
  lastAttack: "miss" | "shot" | "kill";
  x: number;
  y: number;
  winner: number;

  constructor(player: Player, id: number) {
    this.players = [player];
    this.id = id;
    this.currentTurn = player.id;
    this.lastAttack = "miss";
    this.x = 0;
    this.y = 0;
    this.winner = 0;
  }

  gameIsOn(): boolean {
    return this.players.length === 2;
  }

  shipsLaunched(): boolean {
    return this.players.every((player) => player.ships?.length === 10);
  }

  changeTurnId(): void {
    if (this.lastAttack === "miss") {
      const player = this.players.find((player) => player.id !== this.currentTurn);
      if (player !== undefined) {
        this.currentTurn = player.id;
      }
    }
  }

  checkAttack(playerId: number, x: number, y: number): void {
    this.x = x;
    this.y = y;
    const enemy = this.players.find((player) => player.id !== playerId);
    const enemyShips = enemy?.ships;
    if (enemyShips !== undefined) {
      const horizonShips = enemyShips.filter((ship) => !ship.direction);
      const verticalShips = enemyShips.filter((ship) => ship.direction);
      const horizonShip = horizonShips.filter((ship) => {
        if (ship.position.y === y && x >= ship.position.x && x < ship.position.x + ship.length) {
          return true;
        }
        return false;
      });
      const verticalShip = verticalShips.filter((ship) => {
        if (ship.position.x === x && y >= ship.position.y && y < ship.position.y + ship.length) {
          return true;
        }
        return false;
      });
      if (horizonShip.length > 0 || verticalShip.length > 0) {
        console.log("shot");
        this.lastAttack = "shot";
        if (enemy !== undefined) {
          enemy.cellsLeft -= 1;
          if (enemy.cellsLeft === 0) {
            this.winner = playerId;
            const currentPlayer = this.players.find((player) => playerId === player.id);
            if (currentPlayer !== undefined) {
              currentPlayer.wins += 1;
            }
          }
        }
      } else {
        console.log("miss");
        this.lastAttack = "miss";
      }
    }
  }
}

export default Room;
