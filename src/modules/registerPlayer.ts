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

function registerPlayer(
  data: string,
  players: Player[],
  ws: MyWebSocket,
  wsClients: MyWebSocket[]
): string {
  const { name, password } = JSON.parse(data);
  if (typeof name === "string" && typeof password === "string") {
    const id = generateUniqID(players);
    const data = {
      name,
      index: id,
      error: false,
      errorText: ""
    };

    const player = players.find((player) => player.name === name);
    if (player !== undefined) {
      if (player.password === password) {
        const isCurrent = wsClients.some((client) => client.id === player.id);
        if (isCurrent) {
          data.error = true;
          data.errorText = `The session with the ${player.name} name is currently open`;
        } else {
          data.index = player.id;
          ws.id = player.id;
        }
      } else {
        data.error = true;
        data.errorText = "Incorrect password";
      }
    } else {
      players.push(new Player(name, password, id));
      ws.id = id;
    }
    return createAnswer("reg", data);
  }
  return "";
}

export default registerPlayer;
