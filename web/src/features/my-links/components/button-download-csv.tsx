import { cn } from "@/utils/cn";
import { DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { LoadingSpinner, Typography } from "@ui";
import type { ButtonHTMLAttributes } from "react";
import { useDownloadCSV } from "../hooks/use-download-csv";

interface ButtonDownloadCSVProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isUnavailable: boolean;
}

export function ButtonDownloadCSV({
  isUnavailable,
  ...props
}: ButtonDownloadCSVProps) {
  const { downloadCSV, isDownloading } = useDownloadCSV();

  return (
    <button
      disabled={isDownloading || isUnavailable}
      onClick={() => downloadCSV()}
      title="Baixar relatório de links em CSV"
      className={cn(
        "enabled:hover:border-blue-base flex h-8 cursor-pointer items-center gap-1.5 rounded-sm border border-transparent bg-gray-200 p-2 transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50",
      )}
      {...props}
    >
      {isDownloading ? (
        <>
          <LoadingSpinner />
          <Typography
            className="font-semibold text-gray-500"
            variant="sm"
            as="span"
            style={{ fontWeight: 600 }}
          >
            Baixando
          </Typography>
        </>
      ) : (
        <>
          <DownloadSimpleIcon />
          <Typography
            className="font-semibold text-gray-500"
            variant="sm"
            as="span"
            style={{ fontWeight: 600 }}
          >
            Baixar CSV
          </Typography>
        </>
      )}
    </button>
  );
}
