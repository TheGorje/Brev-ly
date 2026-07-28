import type { FastifyInstance } from 'fastify';

import { createLinkRoute } from '../modules/links/routes/create-link-route.js';

export async function registerRoutes(app: FastifyInstance) {
  await app.register(createLinkRoute);
}
