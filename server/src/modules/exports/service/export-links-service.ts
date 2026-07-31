import { PassThrough } from 'node:stream';

import { NoLinksToExportError } from '../../../shared/schemas/no-links-to-export-error.js';
import type { LinksRepository } from '../../links/repositories/links-repository.js';
import type { Storage } from '../../storage/storage.js';
import { createCsvStream } from '../streams/csv-transform-stream.js';

export class ExportLinksService {
  constructor(
    private linksRepository: LinksRepository,
    private storage: Storage,
  ) {}

  async execute() {
    const hasLinks = await this.linksRepository.hasLinks();

    if (!hasLinks) {
      throw new NoLinksToExportError();
    }

    const csvStream = createCsvStream();

    const passThrough = new PassThrough();

    try {
      csvStream.pipe(passThrough);
      const dateWithoutTime = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
        .format(new Date())
        .replace(/\//g, '-')
        .replace(',', '')
        .replace(/:/g, '-');

      const uploadPromise = this.storage.upload({
        fileName: `brev-ly links ${dateWithoutTime}.csv`,
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
