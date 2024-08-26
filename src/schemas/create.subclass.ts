import { z } from 'zod';

export const createSubClassSchema = z.object({
  name: z
    .string()
    .max(50, {
      message: 'Name must be at most 50 characters long',
    })
    .min(5),
  description: z.string().min(10),
  classId: z.string({
    message: 'Class ID must be a valid',
  }),
});

export type CreateSubClassSchema = z.infer<typeof createSubClassSchema>;
