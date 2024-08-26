import { z } from 'zod';

export type CreateFeatDto = {
  name: string;
  description: string;
  prerequisites?: string;
  characterUpgrade?: CharacterUpgrade[];
  element?: Element;
  afinity?: string;
  afinityUpgrades?: CharacterUpgrade[];
};

export type Element = 'REALITY' | 'FEAR' | 'BLOOD' | 'DEATH' | 'ENERGY' | 'KNOWLEDGE';

export type CharacterUpgrade = {
  upgradeTarget: string;
  upgradeValue: number;
};

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
  element: z.string().optional(),
  afinity: z.string().optional().optional(),
  afinityUpgrades: z
    .array(
      z.object({
        upgradeTarget: z.string().nonempty(),
        upgradeValue: z.number(),
      })
    )
    .optional(),
});

export type CreateFeatSchema = z.infer<typeof createFeatSchema>;
