import { PassThrough, type Readable } from 'node:stream';

import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

import { env } from '../../config/env.js';
import type { Storage } from './storage.js';

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export class R2Storage implements Storage {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: 'auto',

      endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,

      credentials: {
        accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,

        secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
      },
    });
  }

  async upload({
    fileName,
    content,
    contentType,
  }: {
    fileName: string;
    content: Readable;
    contentType: string;
  }) {
    let uploadedBytes = 0;

    const progressStream = new PassThrough();

    progressStream.on('data', (chunk) => {
      uploadedBytes += chunk.length;

      console.log(`[STREAM] Processado: ${formatBytes(uploadedBytes)}`);
    });

    content.pipe(progressStream);

    const upload = new Upload({
      client: this.client,

      params: {
        Bucket: env.CLOUDFLARE_BUCKET,
        Key: fileName,
        Body: progressStream,
        ContentType: contentType,
      },

      queueSize: 4,
      partSize: 5 * 1024 * 1024,
    });

    await upload.done();

    return `${env.CLOUDFLARE_PUBLIC_URL}/${fileName}`;
  }
}
