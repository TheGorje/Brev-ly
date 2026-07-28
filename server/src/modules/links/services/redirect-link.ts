import { AppError } from '../../../errors/app-error.js';
import type { LinksRepository } from '../repositories/links-repository.js';

type RedirectLinkRequest = {
  shortUrl: string;
};

export class RedirectLinkService {
  constructor(private linksRepository: LinksRepository) {}

  async execute({ shortUrl }: RedirectLinkRequest) {
    const link = await this.linksRepository.findByShortUrl(shortUrl);

    if (!link) {
      throw new AppError('Link não encontrado.', 404);
    }

    await this.linksRepository.incrementAccessCount(link.id);

    return {
      originalUrl: link.originalUrl,
    };
  }
}
