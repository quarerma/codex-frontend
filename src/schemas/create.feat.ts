import { z } from 'zod';

export const createFeatSchema = z.object({
  name: z.string(),
  description: z.string(),
  prerequisites: z.string().optional(),
  characterUpgrade: z
    .array(
      z.object({
        upgradeTarget: z.string(),
        upgradeValue: z.number(),
      })
    )
    .optional(),
  element: z.string(),
  afinity: z.string().optional().optional(),
  afinityUpgrades: z
    .array(
      z.object({
        upgradeTarget: z.string(),
        upgradeValue: z.number(),
      })
    )
    .optional(),
});

export type CreateFeatSchema = z.infer<typeof createFeatSchema>;
