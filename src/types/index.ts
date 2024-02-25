import { WebSocket } from "ws";

interface WsAnswer {
  type: string;
  data: string;
}

interface PlayerStats {
  name: string;
  wins: number;
}

declare class MyWebSocket extends WebSocket {
  id: number;
}

export type { WsAnswer, PlayerStats, MyWebSocket };
