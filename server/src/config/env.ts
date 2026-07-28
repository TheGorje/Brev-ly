import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().min(1),
});

function validateEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('Invalid environment variables');

    console.error(z.prettifyError(result.error));

    throw new Error('Invalid environment variables');
  }

  return result.data;
}

export const env = validateEnv();
