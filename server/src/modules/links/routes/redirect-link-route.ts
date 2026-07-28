import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { errorSchema } from '../../../shared/schemas/error-schema.js';
import { redirectSchema } from '../../../shared/schemas/redirect-schema.js';
import { LinksRepository } from '../repositories/links-repository.js';
import { RedirectLinkService } from '../services/redirect-link.js';

export const redirectLinkRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/:shortUrl',
    {
      schema: {
        summary: 'Redirect shortened URL',

        params: z.object({
          shortUrl: z.string(),
        }),

        response: {
          200: redirectSchema,

          404: errorSchema,
        },
      },
    },

    async (request, reply) => {
      const repository = new LinksRepository();

      const service = new RedirectLinkService(repository);

      const result = await service.execute(request.params);

      return reply.status(200).send(result);
    },
  );
};
