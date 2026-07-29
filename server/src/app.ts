import { fastify } from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

import { registerCors } from './config/cors.js';
import { registerErrorHandler } from './config/error-handler.js';
import { registerOpenAPI } from './config/openapi.js';
import { registerRoutes } from './routes/register-routes.js';
// import { registerSeedData } from './scripts/seed-links.js';

export async function buildApp() {
  const app = fastify();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  registerErrorHandler(app);

  await registerCors(app);

  await registerOpenAPI(app);

  await registerRoutes(app);

  // // Registra 20 mil links no banco de dados, para testes
  // await registerSeedData();

  return app;
}
