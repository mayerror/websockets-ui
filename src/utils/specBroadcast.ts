import { type WebSocketServer, WebSocket } from "ws";

function specBroadcast(wss: WebSocketServer, answer: string): void {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(answer);
    }
  });
}

export default specBroadcast;
