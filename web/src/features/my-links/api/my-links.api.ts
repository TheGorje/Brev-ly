import { api } from "@/services/api";

import type { CursorPagination, ExportLinksResponse } from "@/types/api";

import type { Link, ListLinksParams } from "../types";

export async function listLinks({ cursor, limit = 20 }: ListLinksParams = {}) {
  const { data } = await api.get<CursorPagination<Link>>("/links/paginated", {
    params: {
      afterCreatedAt: cursor?.createdAt,
      afterId: cursor?.id,
      limit,
    },
  });
  return data;
}

export async function deleteLink(id: string) {
  await api.delete(`/links/${id}`);
}

export async function downloadLinksCSV() {
  const response = await api.get<ExportLinksResponse>("/links/export");

  return response.data;
}
