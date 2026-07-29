import type { LinksRepository } from '../repositories/links-repository.js';

interface GetPaginatedLinksRequest {
  afterCreatedAt?: string | undefined;
  afterId?: string | undefined;
  limit: number;
}

export class GetPaginatedLinksService {
  constructor(private linksRepository: LinksRepository) {}

  async execute({ afterCreatedAt, afterId, limit }: GetPaginatedLinksRequest) {
    const items = await this.linksRepository.findPaginated({
      limit: limit + 1,
      afterCreatedAt: afterCreatedAt ? new Date(afterCreatedAt) : undefined,
      afterId: afterId,
    });

    const hasMore = items.length > limit;

    const visibleItems = hasMore ? items.slice(0, limit) : items;

    const lastItem = visibleItems.at(-1);

    return {
      items: visibleItems,

      hasMore,

      nextCursor:
        hasMore && lastItem
          ? {
              createdAt: lastItem.createdAt.toISOString(),

              id: lastItem.id,
            }
          : null,
    };
  }
}
