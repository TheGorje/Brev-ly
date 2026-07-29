import { count, desc, eq, sql } from 'drizzle-orm';

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

  async findById(id: string) {
    const result = await db.select().from(links).where(eq(links.id, id));

    return result[0];
  }

  async findPaginated({ page, pageSize }: { page: number; pageSize: number }) {
    const offset = (page - 1) * pageSize;
    const items = await db
      .select()
      .from(links)
      .orderBy(desc(links.createdAt), desc(links.id))
      .limit(pageSize)
      .offset(offset);

    const [result] = await db
      .select({
        total: count(),
      })
      .from(links);

    const total = Number(result?.total ?? 0);

    return {
      items,
      total: Number(total),
    };
  }

  async deleteById(id: string) {
    await db.delete(links).where(eq(links.id, id));
  }

  async incrementAccessCount(id: string) {
    await db
      .update(links)
      .set({
        accessCount: sql`${links.accessCount} + 1`,
      })
      .where(eq(links.id, id));
  }

  async *streamAllForExport() {
    const batchSize = 1000;

    let offset = 0;

    while (true) {
      const batch = await db.select().from(links).limit(batchSize).offset(offset);

      if (batch.length === 0) {
        break;
      }

      yield batch;

      offset += batchSize;
    }
  }
}
