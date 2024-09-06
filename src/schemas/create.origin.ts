import { z } from 'zod';
import { createFeatSchema } from './create.feat';

export const createOriginSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  skills: z.array(z.string()).optional(),
  feat: createFeatSchema,
});

export type CreateOriginSchema = z.infer<typeof createOriginSchema>;
