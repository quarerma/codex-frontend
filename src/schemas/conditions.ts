import { z } from 'zod';

export const conditionsSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export type ConditionsSchema = z.infer<typeof conditionsSchema>;
