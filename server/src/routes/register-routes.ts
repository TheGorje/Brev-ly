import type { FastifyInstance } from 'fastify';

import { createLinkRoute } from '../modules/links/routes/create-link-route.js';
import { getLinks } from '../modules/links/routes/get-links-route.js';

export async function registerRoutes(app: FastifyInstance) {
  await app.register(createLinkRoute);
  await app.register(getLinks);
}
