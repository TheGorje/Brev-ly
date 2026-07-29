import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

import { paginatedLinksSchema } from '../../../shared/schemas/paginated-links-schema.js';
import { paginationQuerySchema } from '../../../shared/schemas/pagination-query-schema.js';
import { LinksRepository } from '../repositories/links-repository.js';
import { GetPaginatedLinksService } from '../services/get-paginated-link.js';

export const getPaginatedLinks: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/links/paginated',
    {
      schema: {
        summary: 'List paginated shortened URLs',
        description: 'Returns shortened URLs ordered by newest first using pagination.',

        tags: ['Links'],

        querystring: paginationQuerySchema,

        response: {
          200: paginatedLinksSchema,
        },
      },
    },

    async (request, reply) => {
      const repository = new LinksRepository();

      const service = new GetPaginatedLinksService(repository);

      const result = await service.execute(request.query);

      return reply.send(result);
    },
  );
};
