import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";

import type { Cursor, CursorPagination } from "@/types/api";

import { listLinks } from "../api/my-links.api";
import type { Link } from "../types";

const LIMIT = 20;

export function useLinksList() {
  const query = useInfiniteQuery<
    CursorPagination<Link>,
    Error,
    InfiniteData<CursorPagination<Link>>,
    ["links"],
    Cursor | undefined
  >({
    queryKey: ["links"],

    initialPageParam: undefined as Cursor | undefined,

    queryFn: ({ pageParam }) =>
      listLinks({
        cursor: pageParam,
        limit: LIMIT,
      }),

    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? undefined;
    },
  });

  const links = query.data?.pages.flatMap((page) => page.items ?? []) ?? [];

  return {
    ...query,

    links,

    hasLinks: links.length > 0,

    loadMore: query.fetchNextPage,

    hasMore: query.hasNextPage,

    isLoadingMore: query.isFetchingNextPage,
  };
}
