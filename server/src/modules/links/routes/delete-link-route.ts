import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';

import { errorSchema } from '../../../shared/schemas/error-schema.js';
import { LinksRepository } from '../repositories/links-repository.js';
import { DeleteLinkService } from '../services/delete-link.js';

export const deleteLinkRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    '/links/:id',
    {
      schema: {
        summary: 'Delete shortened URL',

        params: z.object({
          id: z.string().uuid(),
        }),

        response: {
          204: z.void(),
          404: errorSchema,
        },
      },
    },

    async (request, reply) => {
      const repository = new LinksRepository();

      const service = new DeleteLinkService(repository);

      await service.execute(request.params);

      return reply.status(204).send();
    },
  );
};
