import { CopyIcon, TrashIcon } from "@phosphor-icons/react/dist/ssr";
import { ButtonIcon, Typography } from "@ui";

interface LinkCardProps {
  shortUrl: string;
  originalUrl: string;
  accessCount: number;
}
export function LinkCard({
  shortUrl,
  originalUrl,
  accessCount,
}: LinkCardProps) {
  const prefix = "brev.ly/";
  const shortUrlWithPrefix = prefix + shortUrl;
  const hrefShortUrl = "/" + shortUrl;

  const handleCopy = () => {
    alert("copy");
  };

  const handleDelete = () => {
    alert("deletado");
  };

  return (
    <li className="flex items-center justify-between gap-5 py-5">
      <div className="flex flex-col gap-1">
        <Typography
          variant="md"
          as="a"
          href={hrefShortUrl}
          rel="noopener noreferrer"
          target="_blank"
          title={shortUrlWithPrefix}
          className="text-blue-base break-all"
        >
          {shortUrlWithPrefix}
        </Typography>

        <Typography
          variant="sm"
          as="span"
          className="break-all text-gray-500"
          title={originalUrl}
        >
          {originalUrl}
        </Typography>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex">
          <Typography variant="sm" as="span" className="truncate text-gray-500">
            {accessCount} {accessCount === 1 ? "acesso" : "acessos"}
          </Typography>
        </div>

        <div className="flex items-center gap-1">
          <ButtonIcon
            icon={<CopyIcon />}
            onClick={handleCopy}
            title="Copiar link para a área de transferência"
          />
          <ButtonIcon
            icon={<TrashIcon />}
            onClick={handleDelete}
            title="Deletar link"
          />
        </div>
      </div>
    </li>
  );
}
