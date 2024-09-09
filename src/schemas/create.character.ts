import { z } from 'zod';

export const createCharacterSchema = z.object({
  name: z.string().min(1, {
    message: 'Campo obrigatório',
  }),
  level: z.number().int(),
  patent: z.string(),

  ownerId: z.string(),
  campaignId: z.string(),

  classId: z.string(),
  subclassId: z.string(),
  originId: z.string(),

  strenght: z.number().int(),
  dexterity: z.number().int(),
  vitality: z.number().int(),
  intelligence: z.number().int(),
  presence: z.number().int(),

  ritualsIds: z.array(z.string()).optional(),
  featsId: z.array(z.string()).optional(),
});

export type CreateCharacterSchema = z.infer<typeof createCharacterSchema>;
