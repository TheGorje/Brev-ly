import { and, desc, eq, lt, or, sql } from 'drizzle-orm';

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

  async findPaginated(params: {
    afterCreatedAt?: Date | undefined;
    afterId?: string | undefined;
    limit: number;
  }) {
    const { afterCreatedAt, afterId, limit } = params;

    const cursorCondition =
      afterCreatedAt && afterId
        ? or(
            lt(links.createdAt, afterCreatedAt),
            and(eq(links.createdAt, afterCreatedAt), lt(links.id, afterId)),
          )
        : undefined;

    const items = await db
      .select()
      .from(links)
      .where(cursorCondition)
      .orderBy(desc(links.createdAt), desc(links.id))
      .limit(limit);

    return items;
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

  async hasLinks() {
    const result = await db
      .select({
        id: links.id,
      })
      .from(links)
      .limit(1);

    return result.length > 0;
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
