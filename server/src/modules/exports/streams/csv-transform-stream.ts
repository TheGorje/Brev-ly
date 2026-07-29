import { stringify } from 'csv-stringify';

export function createCsvStream() {
  return stringify({
    header: true,

    columns: [
      {
        key: 'originalUrl',
        header: 'URL original',
      },

      {
        key: 'shortUrl',
        header: 'URL encurtada',
      },

      {
        key: 'accessCount',
        header: 'Acessos',
      },

      {
        key: 'createdAt',
        header: 'Data de criação',
      },
    ],
  });
}
