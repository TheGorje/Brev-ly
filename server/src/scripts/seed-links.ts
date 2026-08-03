import { db } from '../db/index.js';
import { links } from '../db/schema/links.js';

export async function registerSeedData() {
  const amount = 20_000;
  const batchSize = 5_000;

  console.log('🌱 Iniciando seed...');
  console.log(`📦 Criando ${amount.toLocaleString('pt-BR')} links de teste`);

  const startedAt = Date.now();

  for (let i = 0; i < amount; i += batchSize) {
    const currentBatchSize = Math.min(batchSize, amount - i);

    const batch = Array.from(
      {
        length: currentBatchSize,
      },
      (_, index) => ({
        originalUrl: `https://example.com/${i + index}`,
        shortUrl: `test-${i + index}`,
        accessCount: i + index,
        createdAt: new Date(Date.now() - (i + index) * 1000),
      }),
    );

    await db.insert(links).values(batch);

    const progress = Math.min(i + batchSize, amount);

    console.log(
      `✅ ${progress.toLocaleString('pt-BR')}/${amount.toLocaleString('pt-BR')} links criados`,
    );
  }

  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(2);

  console.log(`🎉 Seed finalizado em ${elapsed}s`);

  process.exit(0);
}

registerSeedData().catch((err) => {
  console.error('❌ Erro ao rodar seed:', err);
  process.exit(1);
});
