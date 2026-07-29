import { randomUUID } from 'node:crypto';
import { PassThrough } from 'node:stream';

import type { LinksRepository } from '../../links/repositories/links-repository.js';
import type { Storage } from '../../storage/storage.js';
import { createCsvStream } from '../streams/csv-transform-stream.js';

export class ExportLinksService {
  constructor(
    private linksRepository: LinksRepository,
    private storage: Storage,
  ) {}

  async execute() {
    const csvStream = createCsvStream();

    const passThrough = new PassThrough();

    csvStream.pipe(passThrough);

    try {
      const uploadPromise = this.storage.upload({
        fileName: `exports/${randomUUID()}.csv`,
        content: passThrough,
        contentType: 'text/csv',
      });

      for await (const batch of this.linksRepository.streamAllForExport()) {
        for (const link of batch) {
          csvStream.write({
            ...link,
            createdAt: link.createdAt.toLocaleString('pt-BR', {
              timeZone: 'America/Sao_Paulo',
            }),
          });
        }
      }

      csvStream.end();

      const url = await uploadPromise;

      return {
        url,
      };
    } catch (error) {
      csvStream.destroy();
      passThrough.destroy();

      throw error;
    }
  }
}
