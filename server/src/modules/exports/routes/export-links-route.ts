import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

import { errorSchema } from '../../../shared/schemas/error-schema.js';
import { LinksRepository } from '../../links/repositories/links-repository.js';
import { R2Storage } from '../../storage/r2-storage.js';
import { exportSchema } from '../schemas/export-schema.js';
import { ExportLinksService } from '../service/export-links-service.js';

export const exportLinksRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/links/export',
    {
      schema: {
        summary: 'Export shortened URLs as CSV',
        description:
          'Generates a CSV file containing all shortened URLs, uploads it to Cloudflare R2, and returns a public download URL.',
        tags: ['Exports'],

        response: {
          200: exportSchema,
          422: errorSchema.meta({
            message: 'Não existem links cadastrados para exportação.',
          }),
        },
      },
    },

    async (_, reply) => {
      const repository = new LinksRepository();

      const storage = new R2Storage();

      const service = new ExportLinksService(repository, storage);

      const result = await service.execute();

      return reply.status(200).send(result);
    },
  );
};
