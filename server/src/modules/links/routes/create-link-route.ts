import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { errorSchema } from '../../../shared/schemas/error-schema.js';
import { linkSchema } from '../../../shared/schemas/link-schema.js';
import { LinksRepository } from '../repositories/links-repository.js';
import { CreateLinkService } from '../services/create-link.js';

export const createLinkRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/links',
    {
      schema: {
        summary: 'Create a shortened URL',

        body: z.object({
          originalUrl: z
            .string({
              message: 'A URL original é obrigatória.',
            })
            .url('Informe uma URL válida.'),

          shortUrl: z
            .string({
              message: 'A URL encurtada é obrigatória.',
            })
            .min(3, 'No mínimo 3 caracteres.')
            .max(20, 'No máximo 20 caracteres.')
            .regex(/^[a-z0-9-]+$/, 'Apenas letras minúsculas, números e hífen.'),
        }),

        response: {
          201: linkSchema,

          400: errorSchema,

          409: errorSchema,
        },
      },
    },

    async (request, reply) => {
      const repository = new LinksRepository();

      const service = new CreateLinkService(repository);

      const link = await service.execute(request.body);

      return reply.status(201).send(link);
    },
  );
};
