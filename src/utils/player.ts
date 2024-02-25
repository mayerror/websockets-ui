class Player {
  name: string;
  password: string;
  id: number;
  wins: number;

  constructor(name: string, password: string, id: number) {
    this.name = name;
    this.password = password;
    this.id = id;
    this.wins = 0;
  }
}

export default Player;
