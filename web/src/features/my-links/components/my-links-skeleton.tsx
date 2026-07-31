export function MyLinksListSkeleton() {
  return (
    <ul className="mt-6 max-h-125 overflow-hidden pr-1">
      {}
      {Array.from({ length: 5 }).map((_, id) => (
        <li
          key={id}
          className="flex items-center justify-between gap-5 border-t border-gray-200 py-3.5"
        >
          <div className="flex min-w-0 flex-col gap-2">
            <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />

            <div className="h-3 w-52 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="flex shrink-0 items-center gap-5">
            <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />

            <div className="flex items-center gap-1">
              <div className="size-8 animate-pulse rounded bg-gray-200" />
              <div className="size-8 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
