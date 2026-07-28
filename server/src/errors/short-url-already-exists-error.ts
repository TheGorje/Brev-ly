import { AppError } from './app-error.js';

export class ShortUrlAlreadyExistsError extends AppError {
  constructor() {
    super('A URL encurtada já está sendo utilizada.', 409);
  }
}
