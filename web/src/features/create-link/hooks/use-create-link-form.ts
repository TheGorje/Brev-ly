import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import {
  createLinkSchema,
  type CreateLinkFormData,
} from "../schemas/create-link.schema";

export function useCreateLinkForm() {
  const form = useForm<CreateLinkFormData>({
    resolver: zodResolver(createLinkSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<CreateLinkFormData> = (data) => {
    console.log(data);
    form.reset();
  };

  return {
    register: form.register,
    errors: form.formState.errors,
    isValid: form.formState.isValid,
    handleSubmit: form.handleSubmit,
    onSubmit,
    reset: form.reset,
  };
}
