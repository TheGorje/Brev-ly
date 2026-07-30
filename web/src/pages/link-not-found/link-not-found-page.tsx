import { Typography } from "@ui";

import notFoundPageImage from "@/assets/404.svg";

export function LinkNotFoundPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="flex max-w-145 flex-col items-center gap-6 rounded-lg bg-gray-100 px-12 py-16 text-center">
        <img
          src={notFoundPageImage}
          className="select-none"
          width="194"
          height="85"
          alt="site logo"
        />

        <Typography variant="xl" as="h1">
          Link não encontrado
        </Typography>
        <div className="flex flex-col gap-1 text-gray-500">
          <Typography className="break-all" variant="md" as="span">
            O link que você está tentando acessar não existe, foi removido ou é
            uma URL inválida. Saiba mais em{" "}
            <a className="text-blue-base underline" href={"/"}>
              brev.ly
            </a>
          </Typography>
        </div>
      </div>
    </div>
  );
}
