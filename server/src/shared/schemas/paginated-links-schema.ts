import { z } from 'zod';

import { linkSchema } from './link-schema.js';

export const paginatedLinksSchema = z.object({
  items: z.array(linkSchema),

  page: z.number(),

  pageSize: z.number(),

  total: z.number(),

  hasMore: z.boolean(),
});
