import z from 'zod';

export const redirectSchema = z.object({
  originalUrl: z.string().url(),
});
