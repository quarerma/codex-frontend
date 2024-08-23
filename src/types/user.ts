export type User = {
  id: number;
  role: Role;
  username: string;
};

export type Role = 'ADMIN' | 'USER';
