import type { PaginationQuery } from '../../../shared/schemas/pagination-query-schema.js';
import type { LinksRepository } from '../repositories/links-repository.js';

export class GetPaginatedLinksService {
  constructor(private linksRepository: LinksRepository) {}

  async execute({ page, pageSize }: PaginationQuery) {
    const { items, total } = await this.linksRepository.findPaginated({
      page,
      pageSize,
    });

    return {
      items,
      page,
      pageSize,
      total,
      hasMore: page * pageSize < total,
    };
  }
}
