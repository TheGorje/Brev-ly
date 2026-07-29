import { z } from 'zod';

export const errorSchema = z
  .object({
    message: z.string().meta({
      description: 'Error message.',
    }),
  })
  .describe('Application error response');
