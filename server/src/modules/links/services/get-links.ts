import type { LinksRepository } from '../repositories/links-repository.js';

export class GetLinksService {
  constructor(private linksRepository: LinksRepository) {}

  async execute() {
    return this.linksRepository.findMany();
  }
}
