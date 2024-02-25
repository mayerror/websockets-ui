import { RawData, WebSocketServer } from "ws";
import { WsAnswer } from "../types";

const middleware = (wss: WebSocketServer, rawData: RawData) => {
  const { type, data }: WsAnswer = JSON.parse(rawData.toString());
  console.log(
    `\x1b[33m Number of clients: \x1b[0m ${wss.clients.size}, \x1b[33m Type message: \x1b[0m ${type} `
  );
  console.log(`\x1b[36m Data: \x1b[0m ${data.toString()}`);
};

export default middleware;
