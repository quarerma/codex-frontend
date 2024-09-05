export type User = {
  id: string;
  role: Role;
  username: string;
};

export type Role = 'ADMIN' | 'USER';
