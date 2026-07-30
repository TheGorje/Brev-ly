import { z } from "zod";

export const createLinkSchema = z.object({
  originalUrl: z.url("Informe uma URL válida"),

  shortUrl: z
    .string()
    .trim()
    .min(3, "No mínimo 3 caracteres.")
    .max(20, "No máximo 20 caracteres.")
    .regex(/^[a-z0-9-]+$/, "Apenas letras minúsculas, números e hífen."),
});

export type CreateLinkFormData = z.infer<typeof createLinkSchema>;
