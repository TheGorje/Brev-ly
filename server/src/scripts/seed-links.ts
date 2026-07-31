import { db } from '../db/index.js';
import { links } from '../db/schema/links.js';

export async function registerSeedData() {
  const amount = 20_000;
  const batchSize = 5000;

  for (let i = 0; i < amount; i += batchSize) {
    const batch = Array.from(
      {
        length: Math.min(batchSize, amount - i),
      },
      (_, index) => ({
        originalUrl: `https://example.com/${i + index}`,

        shortUrl: `test-${i + index}`,

        accessCount: i + index,

        createdAt: new Date(Date.now() - (i + index) * 1000),
      }),
    );

    await db.insert(links).values(batch);
  }

  process.exit();
}
