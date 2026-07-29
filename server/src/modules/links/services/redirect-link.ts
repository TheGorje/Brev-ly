import { ShortUrlNotFoundError } from '../../../errors/short-url-not-found-error.js';
import type { LinksRepository } from '../repositories/links-repository.js';

type RedirectLinkRequest = {
  shortUrl: string;
};

export class RedirectLinkService {
  constructor(private linksRepository: LinksRepository) {}

  async execute({ shortUrl }: RedirectLinkRequest) {
    const link = await this.linksRepository.findByShortUrl(shortUrl);

    if (!link) {
      throw new ShortUrlNotFoundError();
    }

    await this.linksRepository.incrementAccessCount(link.id);

    return {
      originalUrl: link.originalUrl,
    };
  }
}
