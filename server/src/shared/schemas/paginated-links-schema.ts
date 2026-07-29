import { z } from 'zod';

import { linkSchema } from './link-schema.js';

export const paginatedLinksSchema = z.object({
  items: z.array(linkSchema),

  nextCursor: z
    .object({
      createdAt: z.iso.datetime(),
      id: z.uuid(),
    })
    .nullable(),

  hasMore: z.boolean(),
});
