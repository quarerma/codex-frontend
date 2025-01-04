import { z } from 'zod';

export const createCharacterSchema = z.object({
  name: z.string().min(1, {
    message: 'O campo Nome é obrigatório',
  }),
  level: z.coerce.number().min(1, {
    message: 'O campo Nível é obrigatório e deve ser um número inteiro',
  }),
  patent: z.string().min(1, {
    message: 'O campo Patente é obrigatório',
  }),

  ownerId: z.string().min(1, {
    message: 'O campo ID do Dono é obrigatório',
  }),
  campaignId: z.string().min(1, {
    message: 'O campo ID da Campanha é obrigatório',
  }),

  classId: z.string().min(1, {
    message: 'O campo Classe é obrigatório, porém pode ser alterado depois',
  }),
  subclassId: z.string().min(1, {
    message: 'O campo Subclasse é obrigatório, porém pode ser alterado depois',
  }),
  originId: z.string().min(1, {
    message: 'O campo Origem é obrigatório',
  }),

  strength: z.number().int().min(0, {
    message: 'O campo Força é obrigatório e deve ser um número inteiro',
  }),
  dexterity: z.number().int().min(0, {
    message: 'O campo Destreza é obrigatório e deve ser um número inteiro',
  }),
  vitality: z.number().int().min(0, {
    message: 'O campo Vitalidade é obrigatório e deve ser um número inteiro',
  }),
  intelligence: z.number().int().min(0, {
    message: 'O campo Inteligência é obrigatório e deve ser um número inteiro',
  }),
  presence: z.number().int().min(0, {
    message: 'O campo Presença é obrigatório e deve ser um número inteiro',
  }),

  ritualsIds: z.array(z.string()).optional(),
  featsId: z.array(z.string()).optional(),
});

export type CreateCharacterSchema = z.infer<typeof createCharacterSchema>;
