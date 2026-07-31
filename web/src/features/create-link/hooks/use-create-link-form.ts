import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  createLinkSchema,
  type CreateLinkFormData,
} from "../schemas/create-link.schema";
import { useCreateLink } from "./use-create-link";
import { notify } from "@/libs/toast";
import { isAxiosError } from "axios";

export function useCreateLinkForm() {
  const createLinkMutation = useCreateLink();

  const form = useForm<CreateLinkFormData>({
    resolver: zodResolver(createLinkSchema),
    mode: "onBlur",
  });

  const { setError } = form;

  async function onSubmit(data: CreateLinkFormData) {
    try {
      await createLinkMutation.mutateAsync(data);

      notify.success.linkCreated();

      form.reset();
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 409) {
          setError("shortUrl", {
            type: "server",
            message: "Este link encurtado já está em uso.",
          });

          return;
        }

        if (status === 400 || status === 422) {
          notify.error.invalidLink();
          return;
        }
      }

      notify.error.unexpected();
    }
  }

  return {
    register: form.register,
    errors: form.formState.errors,
    isValid: form.formState.isValid,
    handleSubmit: form.handleSubmit,
    reset: form.reset,
    onSubmit,
    isPending: createLinkMutation.isPending,
  };
}
