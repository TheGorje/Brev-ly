import { z } from 'zod';

export const exportSchema = z
  .object({
    url: z.url().meta({
      description: 'Public URL of the generated CSV file.',
    }),
  })
  .meta({
    example: {
      url: 'https://pub-xxxxxxxxxxxxxxxx.r2.dev/exports/8d3f2e6b.csv',
    },
  });
