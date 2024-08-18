import { z } from 'zod';

export const loginschema = z.object({
  username: z.string().min(3, {
    message: 'Username must be at least 3 characters long',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
});

export type LoginSchema = z.infer<typeof loginschema>;
