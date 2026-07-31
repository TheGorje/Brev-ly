import { MyLinksList } from "./my-links-list";
import { MyLinksHeader } from "./my-links-header";
import { MyLinksListEmpty } from "./my-links-list-empty";
import { MyLinksLoadingBar } from "./my-links-loading-bar";
import { MyLinksListSkeleton } from "./my-links-skeleton";
import { useLinksList } from "../hooks/use-links-list";

export function MyLinks() {
  const {
    links,
    isPending,
    isFetching,
    hasLinks,
    loadMore,
    hasMore,
    isLoadingMore,
  } = useLinksList();

  const isLoading = isPending;
  const isUnavailable = !hasLinks || isPending;
  const isEmpty = !isLoading && !hasLinks;
  const hasContent = !isLoading && hasLinks;

  console.log(links);
  return (
    <div className="relative flex w-full min-w-0 flex-col gap-4 rounded-lg bg-gray-100 p-8 lg:flex-1">
      <MyLinksHeader isUnavailable={isUnavailable} />
      {isFetching && <MyLinksLoadingBar />}

      {isLoading && <MyLinksListSkeleton />}

      {isEmpty && <MyLinksListEmpty />}

      {hasContent && Object.keys(links).length >= 1 && (
        <MyLinksList
          links={links}
          loadMore={loadMore}
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
        />
      )}
    </div>
  );
}
