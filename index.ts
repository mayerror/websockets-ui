import { httpServer } from "./src/http_server";
import { RawData, WebSocketServer, WebSocket } from "ws";
import * as http from "http";

const HTTP_PORT = 8181;

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.on("message", (data) => {
    middleware(wss, data);
  });

  console.log("Connection established");
});

httpServer.listen(HTTP_PORT);
console.log(`Start static http server on the ${HTTP_PORT} port!`);

const middleware = (wss: WebSocketServer, data: RawData) => {
  console.log(wss.clients.size);
  console.log(data.toString());
};
