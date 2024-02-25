interface WsAnswer {
  type: string;
  data: string;
}

interface PlayerStats {
  name: string;
  wins: number;
}

export type { WsAnswer, PlayerStats };
