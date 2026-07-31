import { useEffect, useRef } from "react";
import type { Link } from "../types";
import { MyLinksCard } from "./my-link-card";
import { LoadingSpinner, Typography } from "@/components/ui";

interface MyLinksListProps {
  links: Link[];
  loadMore: () => void;
  hasMore: boolean;
  isLoadingMore: boolean;
}

export function MyLinksList({
  links,
  hasMore,
  isLoadingMore,
  loadMore,
}: MyLinksListProps) {
  const listRef = useRef<HTMLUListElement | null>(null);
  const endRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    const target = endRef.current;

    if (!target) return;
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("carregando mais");
          if (isLoadingMore) return;
          loadMore();
        }
      },
      {
        root: listRef.current,
        threshold: 0.1,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, loadMore, isLoadingMore]);

  return (
    <ul ref={listRef} className="max-h-125 overflow-auto pr-1">
      {links.map((link) => (
        <MyLinksCard
          key={link.id}
          accessCount={link.accessCount}
          shortUrl={link.shortUrl}
          originalUrl={link.originalUrl}
          createdAt={link.createdAt}
          id={link.id}
        />
      ))}

      {hasMore && (
        <li ref={endRef} className="flex w-full items-center py-4 text-center">
          {isLoadingMore && (
            <div className="flex w-full items-center justify-center gap-1">
              <LoadingSpinner />
              <Typography variant="sm" as="span">
                Carregando mais
              </Typography>
            </div>
          )}
        </li>
      )}
    </ul>
  );
}
