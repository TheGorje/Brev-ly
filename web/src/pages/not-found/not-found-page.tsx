import { Typography } from "@ui";

import notFoundPageImage from "@/assets/404.svg";

export function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex max-w-145 flex-col items-center gap-6 rounded-lg bg-gray-100 px-12 py-16 text-center">
        <img
          src={notFoundPageImage}
          className="select-none"
          width="194"
          height="85"
          alt="site logo"
        />

        <Typography variant="xl" as="h1">
          Página não encontrada
        </Typography>
        <div className="flex flex-col gap-1 text-gray-500">
          <Typography variant="md" as="span">
            O conteúdo solicitado não existe ou foi removido.
          </Typography>
          <Typography
            className="text-blue-base underline"
            variant="md"
            as="a"
            href={"/"}
          >
            Voltar para a página inicial
          </Typography>
        </div>
      </div>
    </div>
  );
}
