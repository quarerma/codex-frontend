export type Campaign = {
  id: string;
  createdAt: Date;
  name: string;
  description: string;
  owner: {
    username: string;
    id: string;
  };
  players: {
    playerId: string;
  }[];
};
