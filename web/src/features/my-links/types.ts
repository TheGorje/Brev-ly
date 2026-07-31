import type { Cursor } from "@/types/api";

export interface Link {
  id: string;
  originalUrl: string;
  shortUrl: string;
  accessCount: number;
  createdAt: string;
}

export interface ListLinksParams {
  cursor?: Cursor;
  limit?: number;
}
