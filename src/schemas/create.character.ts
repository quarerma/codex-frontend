import { z } from 'zod';

export const createCharacterSchema = z.object({
  name: z.string().min(1, {
    message: 'O nome é obrigatório',
  }),
  level: z.coerce.number().min(1, {
    message: 'O nível é obrigatório e deve ser um número inteiro',
  }),
  patent: z.string().min(1, {
    message: 'A patente é obrigatória',
  }),

  ownerId: z.string().min(1, {
    message: 'O ID do dono é obrigatório',
  }),
  campaignId: z.string().min(1, {
    message: 'O ID da campanha é obrigatório',
  }),

  classId: z.string().min(1, {
    message: 'A classe é obrigatória, porém pode ser alterada depois',
  }),
  subclassId: z.string().min(1, {
    message: 'A subclasse é obrigatória, porém pode ser alterada depois',
  }),
  originId: z.string().min(1, {
    message: 'A origem é obrigatória',
  }),

  strength: z.number().int().min(1, {
    message: 'A força é obrigatória e deve ser um número inteiro',
  }),
  dexterity: z.number().int().min(1, {
    message: 'A destreza é obrigatória e deve ser um número inteiro',
  }),
  vitality: z.number().int().min(1, {
    message: 'A vitalidade é obrigatória e deve ser um número inteiro',
  }),
  intelligence: z.number().int().min(1, {
    message: 'A inteligência é obrigatória e deve ser um número inteiro',
  }),
  presence: z.number().int().min(1, {
    message: 'A presença é obrigatória e deve ser um número inteiro',
  }),

  ritualsIds: z.array(z.string()).optional(),
  featsId: z.array(z.string()).optional(),
});

export type CreateCharacterSchema = z.infer<typeof createCharacterSchema>;
