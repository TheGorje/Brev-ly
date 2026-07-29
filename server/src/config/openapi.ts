import { fastifySwagger } from '@fastify/swagger';
import scalarUI from '@scalar/fastify-api-reference';
import type { FastifyInstance } from 'fastify';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

export async function registerOpenAPI(app: FastifyInstance) {
  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Brev.ly API',
        description: 'Achieve URL shortening management.',
        version: '1.0.0',
      },
    },

    transform: jsonSchemaTransform,
  });

  await app.register(scalarUI, {
    routePrefix: '/docs',

    configuration: {
      layout: 'classic',
    },
  });

  app.get('/openapi.json', () => {
    return app.swagger();
  });
}
