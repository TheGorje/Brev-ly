import z from 'zod';

export const linkSchema = z
  .object({
    id: z.uuid().meta({
      description: 'Unique identifier.',
      example: 'c6ef8ef8-2f17-4b87-9db8-c88d72db0d54',
    }),

    originalUrl: z.url().meta({
      description: 'Original URL.',
      example: 'https://www.rocketseat.com.br',
    }),

    shortUrl: z.string().meta({
      description: 'Unique short URL.',
      example: 'rocketseat',
    }),

    accessCount: z.number().meta({
      description: 'Number of accesses.',
      example: 42,
    }),

    createdAt: z.date().meta({
      description: 'Creation date.',
    }),
  })
  .meta({
    example: {
      id: 'c6ef8ef8-2f17-4b87-9db8-c88d72db0d54',
      originalUrl: 'https://www.rocketseat.com.br',
      shortUrl: 'rocketseat',
      accessCount: 42,
      createdAt: '2026-07-28T22:17:27.647Z',
    },
  });
