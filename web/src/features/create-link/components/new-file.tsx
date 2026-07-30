import { Button, TextField, Typography } from "@ui";
import { useCreateLinkForm } from "../hooks/use-create-link-form";

export function NewLink() {
  const { register, errors, isValid, handleSubmit, onSubmit } =
    useCreateLinkForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-6 rounded-lg bg-gray-100 p-8 lg:w-96 lg:flex-none"
    >
      <Typography variant="lg" as="h2" className="select-none">
        Novo link
      </Typography>

      <TextField
        label="Link original"
        placeholder="https://www.exemplo.com.br"
        error={errors.originalUrl?.message}
        {...register("originalUrl")}
      />

      <TextField
        label="Link encurtado"
        prefix="brev.ly/"
        error={errors.shortUrl?.message}
        {...register("shortUrl")}
      />

      <Button type="submit" disabled={!isValid}>
        Salvar link
      </Button>
    </form>
  );
}
