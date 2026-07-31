import { AppError } from '../../errors/app-error.js';

export class NoLinksToExportError extends AppError {
  constructor() {
    super('Não existem links cadastrados para exportação.', 422);
  }
}
