import { cn } from "@/lib/utils/cn";
import { DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { Typography } from "@ui";

export function ButtonDownloadCSV() {
  return (
    <button
      title="Baixar relatório de links em CSV"
      className={cn(
        "enabled:hover:border-blue-base flex h-8 cursor-pointer items-center gap-1.5 rounded-sm border border-transparent bg-gray-200 p-2 transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50",
      )}
    >
      <DownloadSimpleIcon />
      <Typography
        className="font-semibold text-gray-500"
        variant="sm"
        as="span"
        style={{ fontWeight: 600 }}
      >
        Baixar CSV
      </Typography>
    </button>
  );
}
