import { AppError } from './app-error.js';

export class ShortUrlNotFoundError extends AppError {
  constructor() {
    super('Link não encontrado.', 404);
  }
}
