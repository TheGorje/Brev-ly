import { useRoute } from "@/hooks/use-route";

import LogoIcon from "@/assets/Logo_Icon.svg";
import { Typography } from "@ui";
import { useRedirect } from "../hooks/use-redirect";

export function RedirectLink() {
  const { shortUrl } = useRoute();
  const { data } = useRedirect(shortUrl ?? "");

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex max-w-145 flex-col items-center gap-6 rounded-lg bg-gray-100 px-12 py-16 text-center">
        <img
          src={LogoIcon}
          className="select-none"
          width="48"
          height="48"
          alt="site logo"
        />
        <Typography variant="xl" as="h1">
          Redirecionando...
        </Typography>

        <div className="flex flex-col gap-1 text-gray-500">
          <Typography variant="md" as="span">
            O link será aberto automaticamente em alguns instantes.
          </Typography>

          {data && (
            <Typography variant="md">
              Não foi redirecionado?{" "}
              <Typography
                as="a"
                variant="md"
                href={data.originalUrl}
                className="text-blue-base underline"
              >
                Acesse aqui
              </Typography>
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}
