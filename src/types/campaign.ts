export type Campaign = {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  owner: {
    username: string;
    id: string;
  };
};
