import { ShortUrlNotFoundError } from '../../../errors/short-url-not-found-error.js';
import type { LinksRepository } from '../repositories/links-repository.js';

type DeleteLinkRequest = {
  id: string;
};

export class DeleteLinkService {
  constructor(private linksRepository: LinksRepository) {}

  async execute({ id }: DeleteLinkRequest) {
    const link = await this.linksRepository.findById(id);

    if (!link) {
      throw new ShortUrlNotFoundError();
    }

    await this.linksRepository.deleteById(id);
  }
}
