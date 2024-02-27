import type Ship from "./ship";

class Player {
  name: string;
  password: string;
  id: number;
  wins: number;
  ships?: Ship[];
  cellsLeft: number;

  constructor(name: string, password: string, id: number) {
    this.name = name;
    this.password = password;
    this.id = id;
    this.wins = 0;
    this.ships = [];
    this.cellsLeft = 20;
  }
}

export default Player;
