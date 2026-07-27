import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

export const healthRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/health',

    {
      schema: {
        summary: 'Health check',

        response: {
          200: z.object({
            status: z.string(),
          }),
        },
      },
    },

    async () => {
      return {
        status: 'ok',
      };
    },
  );
};
