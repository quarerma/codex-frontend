import { z } from 'zod';

export const createEquimentSchema = z.object({
  name: z.string(),
  description: z.string(),
  weight: z.coerce.number(),
  category: z.coerce.number(),
  type: z.string(),
  is_custom: z.boolean().default(false),
  num_of_uses: z.coerce.number().default(0),
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
  critical_range: z.coerce.number().optional(),
  critical_multiplier: z.coerce.number().optional(),
  range: z.string().optional(),
  damage_type: z.string().optional(),
  weapon_type: z.string().optional(),
  weapon_category: z.string().optional(),
  hand_type: z.string().optional(),

  // CursedItem
  element: z.string().optional().default(''),
});

export type CreateEquimentSchema = z.infer<typeof createEquimentSchema>;
