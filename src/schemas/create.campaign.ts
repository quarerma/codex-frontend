import { z } from 'zod';

export const createCampaignSchema = z.object({
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters long',
  }),
  description: z
    .string()
    .min(3, {
      message: 'Description must be at least 3 characters long',
    })
    .max(100, { message: 'Descrição deve conter ao máximo 200 caracteres' }),

  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
});

export type CreateCampaignSchema = z.infer<typeof createCampaignSchema>;
