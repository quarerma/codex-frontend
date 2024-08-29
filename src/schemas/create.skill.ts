import { z } from 'zod';

export const createSkillSchema = z.object({
  name: z.string(),
  description: z.string(),
  atribute: z.string(),
  only_trained: z.boolean(),
  carry_peanalty: z.boolean(),
  needs_kit: z.boolean(),
  is_custom: z.boolean(),
});

export type CreateSkillSchema = z.infer<typeof createSkillSchema>;
