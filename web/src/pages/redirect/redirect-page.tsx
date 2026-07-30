// import { useNavigateTo } from "@/hooks/use-navigation-to";
import { useRoute } from "@/hooks/use-route";

import LogoIcon from "@/assets/Logo_Icon.svg";
import { Typography } from "@ui";

export function RedirectPage() {
  const { shortUrl } = useRoute();
  // const { linkNotFound } = useNavigateTo();

  const originalUrl = "https://google.com/";

  console.log(shortUrl);

  return (
    <div className="flex h-full flex-col items-center justify-center">
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
          <Typography variant="md" as="span">
            Não foi redirecionado?{" "}
            <a className="text-blue-base underline" href={originalUrl}>
              Acesse aqui
            </a>
          </Typography>
        </div>
      </div>
      {/* <button
        onClick={linkNotFound}
        className="rounded-md bg-gray-500 p-4 px-8 text-gray-100"
      >
        page not found test
      </button> */}
    </div>
  );
}
