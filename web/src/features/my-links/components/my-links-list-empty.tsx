import { Typography } from "@/components/ui";
import { LinkIcon } from "@phosphor-icons/react/dist/ssr";

export function MyLinksListEmpty() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="h-px w-full bg-gray-200" />

      <div className="flex flex-col items-center gap-3 pt-4 pb-6">
        <LinkIcon className="size-7 fill-gray-400" />
        <Typography variant="xs" as="label" className="text-gray-500">
          ainda não existem links cadastrados
        </Typography>
      </div>
    </div>
  );
}
