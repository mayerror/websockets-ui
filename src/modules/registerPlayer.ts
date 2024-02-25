import { type MyWebSocket } from "../types";
import createAnswer from "../utils/createAnswer";
import Player from "../utils/player";

export function generateUniqID<T>(itemList: Array<T & { id?: number }>): number {
  while (true) {
    const id = Math.floor(Math.random() * 1000);
    if (!itemList.some((item) => item.id === id)) {
      return id;
    }
  }
}

function registerPlayer(data: string, players: Player[], ws: MyWebSocket): string {
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
      ws.id = id;
    }
    return createAnswer("reg", data);
  }
  return "";
}

export default registerPlayer;
