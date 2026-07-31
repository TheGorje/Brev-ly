import axios from "axios";
import { delay } from "@/utils/delay";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

api.interceptors.request.use(async (config) => {
  const delayMs = Number(import.meta.env.VITE_API_DELAY_MS ?? 0);

  await delay(delayMs);

  return config;
});
