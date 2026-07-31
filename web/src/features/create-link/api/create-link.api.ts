import { api } from "@/services/api";
import type { CreateLinkBody, CreateLinkResponse } from "../types";

export async function createLink(body: CreateLinkBody) {
  const { data } = await api.post<CreateLinkResponse>("/links", body);

  return data;
}
