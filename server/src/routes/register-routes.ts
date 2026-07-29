import type { FastifyInstance } from 'fastify';

import { exportLinksRoute } from '../modules/exports/routes/export-links-route.js';
import { createLinkRoute } from '../modules/links/routes/create-link-route.js';
import { deleteLinkRoute } from '../modules/links/routes/delete-link-route.js';
import { getLinksRoute } from '../modules/links/routes/get-links-route.js';
import { redirectLinkRoute } from '../modules/links/routes/redirect-link-route.js';

export async function registerRoutes(app: FastifyInstance) {
  await app.register(createLinkRoute);
  await app.register(getLinksRoute);
  await app.register(deleteLinkRoute);
  await app.register(exportLinksRoute);

  await app.register(redirectLinkRoute);
}
