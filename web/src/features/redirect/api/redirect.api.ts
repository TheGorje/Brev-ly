import { api } from "@/services/api";
import type { RedirectResponse } from "../types";

export async function getOriginalUrl(shortUrl: string) {
  const { data } = await api.get<RedirectResponse>(`/${shortUrl}`);

  return data;
}
