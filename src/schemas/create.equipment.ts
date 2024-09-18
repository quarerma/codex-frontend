import { z } from 'zod';

export const CreateEquimentSchema = z.object({
  name: z.string(),
  description: z.string(),
  weight: z.number(),
  category: z.number(),
  type: z.string(),
  is_custom: z.boolean().default(false),
  num_of_uses: z.number().default(0),
  characterUpgrade: z
    .array(
      z.object({
        type: z.string(),
        upgradeTarget: z.string().optional(),
        upgradeValue: z.number().optional(),
      })
    )
    .optional(),

  // Weapon
  damage: z.string().optional(),
  critical_range: z.number().optional(),
  critical_multiplier: z.number().optional(),
  range: z.string().optional(),
  damage_type: z.string().optional(),
  weapon_type: z.string().optional(),
  weapon_category: z.string().optional(),
  hand_type: z.string().optional(),

  // CursedItem
  element: z.string().optional().default(''),
});
