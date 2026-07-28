import { eq } from 'drizzle-orm';

import { db } from '../../../db/index.js';
import { links } from '../../../db/schema/links.js';

export class LinksRepository {
  async create(data: { originalUrl: string; shortUrl: string }) {
    const result = await db.insert(links).values(data).returning();

    const link = result[0];

    if (!link) {
      throw new Error('Failed to create link');
    }

    return link;
  }

  async findByShortUrl(shortUrl: string) {
    const result = await db.select().from(links).where(eq(links.shortUrl, shortUrl));

    return result[0];
  }

  async findMany() {
    return db.select().from(links);
  }
}
