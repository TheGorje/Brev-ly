import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';

import { linkSchema } from '../../../shared/schemas/link-schema.js';
import { LinksRepository } from '../repositories/links-repository.js';
import { GetLinksService } from '../services/get-links.js';

export const getLinksRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/links',
    {
      schema: {
        summary: 'List all shortened URLs',
        description: 'Returns all shortened URLs with their metadata.',
        tags: ['Links'],

        response: {
          200: z.array(linkSchema),
        },
      },
    },

    async (_, reply) => {
      const repository = new LinksRepository();

      const service = new GetLinksService(repository);

      const links = await service.execute();

      return reply.status(200).send(links);
    },
  );
};
