import { z } from 'zod';

export const createRitualsSchema = z.object({
  name: z.string(),
  normalCastDescription: z.string(),
  normalCost: z.coerce.number().gte(0),
  ritualLevel: z.coerce.number().gte(0),
  exectutionTime: z.string(),
  range: z.string(),
  target: z.string(),
  duration: z.string(),
  element: z.string(),

  resistance: z.string(),
  type: z.string(),
  conditions: z.array(z.string()).optional(),

  discentCastDescription: z.string().optional(),
  discentCost: z.coerce.number().optional(),
  trueCastDescription: z.string().optional(),
  trueCost: z.coerce.number().optional(),
  // DamageRitual attributes
  normalCastDamageType: z.string().optional(),
  discentCastDamageType: z.string().optional(),
  trueCastDamageType: z.string().optional(),

  normalCastDamage: z.string().optional(),
  discentCastDamage: z.string().optional(),
  trueCastDamage: z.string().optional(),
});

export type CreateRitualsSchema = z.infer<typeof createRitualsSchema>;
