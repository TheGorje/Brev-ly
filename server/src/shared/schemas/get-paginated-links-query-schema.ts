import { z } from 'zod';

export const paginationCursorQuerySchema = z.object({
  afterCreatedAt: z.iso.datetime().optional().meta({
    description: 'Creation date of the last item returned.',
    example: '2026-09-28T18:30:00.000Z',
  }),

  afterId: z.uuid().optional().meta({
    description: 'Identifier of the last item returned.',
    example: 'c6ef8ef8-2f17-4b87-9db8-c88d72db0d54',
  }),

  limit: z.coerce.number().int().min(1).max(100).default(20).meta({
    description: 'Maximum number of items returned',
    example: 20,
  }),
});
