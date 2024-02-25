import createAnswer from "../utils/createAnswer";
import Player from "../utils/player";

function generateUniqID(playerList: Player[]): number {
  while (true) {
    const id = Math.floor(Math.random() * 1000);
    if (!playerList.some((player) => player.id === id)) {
      return id;
    }
  }
}

function registerPlayer(data: string, players: Player[]): string {
  const { name, password } = JSON.parse(data);
  if (typeof name === "string" && typeof password === "string") {
    const id = generateUniqID(players);
    const data = {
      name,
      index: id,
      error: false,
      errorText: ""
    };

    if (players.some((player) => player.name === name)) {
      data.error = true;
      data.errorText = "This name already exists";
    } else {
      players.push(new Player(name, password, id));
    }
    return createAnswer("reg", data);
  }
  return "";
}

export default registerPlayer;
