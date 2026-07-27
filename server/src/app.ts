import { fastify } from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

import { registerCors } from './config/cors.js';
import { registerOpenAPI } from './config/openapi.js';
import { registerRoutes } from './routes/index.js';

export async function buildApp() {
  const app = fastify();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  await registerCors(app);

  await registerOpenAPI(app);

  await registerRoutes(app);

  return app;
}
