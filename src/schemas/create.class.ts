import { z } from 'zod';

export const createClassSchema = z.object({
  name: z
    .string()
    .max(50, {
      message: 'Name must be at most 50 characters long',
    })
    .min(5),
  description: z.string().min(10),
  hitPointsPerLevel: z.coerce.number().gte(0),
  SanityPointsPerLevel: z.coerce.number().gte(0),
  effortPointsPerLevel: z.coerce.number().gte(0),
  initialHealth: z.coerce.number().gte(0),
  initialSanity: z.coerce.number().gte(0),
  initialEffort: z.coerce.number().gte(0),
});

export type CreateClassSchema = z.infer<typeof createClassSchema>;
