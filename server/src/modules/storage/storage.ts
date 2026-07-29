import type { Readable } from 'node:stream';

export interface Storage {
  upload(params: { fileName: string; content: Readable; contentType: string }): Promise<string>;
}
