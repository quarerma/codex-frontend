import { z } from 'zod';

export const createFeatSchema = z.object({
  name: z.string(),
  description: z.string(),
  prerequisites: z.string().optional(),
  characterUpgrade: z
    .array(
      z.object({
        type: z.string(),
        upgradeTarget: z.string().optional(),
        upgradeValue: z.number().optional(),
      })
    )
    .optional(),
  element: z.string(),
  afinity: z.string().optional().optional(),
  afinityUpgrades: z
    .array(
      z.object({
        type: z.string(),
        upgradeTarget: z.string().optional(),
        upgradeValue: z.number().optional(),
      })
    )
    .optional(),
});

export type CreateFeatSchema = z.infer<typeof createFeatSchema>;
