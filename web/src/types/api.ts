export interface Cursor {
  createdAt: string;
  id: string;
}

export interface CursorPagination<T> {
  items: T[];
  nextCursor: Cursor | null;
  hasMore: boolean;
}

export interface ExportLinksResponse {
  url: string;
}
