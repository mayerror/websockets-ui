import { RawData, WebSocketServer } from "ws";

const middleware = (wss: WebSocketServer, data: RawData) => {
  const obj = JSON.parse(data.toString());
  console.log(
    `\x1b[33m Number of clients: \x1b[0m ${wss.clients.size}, \x1b[33m Type message: \x1b[0m ${obj.type} `
  );
  console.log(`\x1b[36m Data: \x1b[0m ${obj.data.toString()}`);
};

export default middleware;
