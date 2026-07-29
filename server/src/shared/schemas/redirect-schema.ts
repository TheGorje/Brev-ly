import { z } from 'zod';

export const redirectSchema = z
  .object({
    originalUrl: z.url().meta({
      description: 'Original URL.',
      example: 'https://www.rocketseat.com.br',
    }),
  })
  .meta({
    example: {
      originalUrl: 'https://www.rocketseat.com.br',
    },
  });
