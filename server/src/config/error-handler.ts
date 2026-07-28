import type { FastifyInstance } from 'fastify';

import { AppError } from '../errors/app-error.js';

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, _, reply) => {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        message: error.message,
      });
    }

    type FastifyValidationError = {
      code: 'FST_ERR_VALIDATION';
      validation: Array<{
        message: string;
      }>;
    };
    function isValidationError(error: unknown): error is FastifyValidationError {
      return (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 'FST_ERR_VALIDATION' &&
        'validation' in error &&
        Array.isArray(error.validation)
      );
    }

    if (isValidationError(error)) {
      return reply.status(400).send({
        message: error.validation[0]?.message ?? 'Dados inválidos.',
      });
    }

    console.error(error);

    return reply.status(500).send({
      message: 'Erro interno do servidor.',
    });
  });
}
