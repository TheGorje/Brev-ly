import { ShortUrlAlreadyExistsError } from '../../../errors/short-url-already-exists-error.js';
import { LinksRepository } from '../repositories/links-repository.js';

interface CreateLinkRequest {
  originalUrl: string;
  shortUrl: string;
}

export class CreateLinkService {
  constructor(private linksRepository: LinksRepository) {}

  async execute({ originalUrl, shortUrl }: CreateLinkRequest) {
    const linkExists = await this.linksRepository.findByShortUrl(shortUrl);

    if (linkExists) {
      throw new ShortUrlAlreadyExistsError();
    }

    const link = await this.linksRepository.create({
      originalUrl,
      shortUrl,
    });

    return link;
  }
}
