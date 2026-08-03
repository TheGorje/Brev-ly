import { CopyIcon, TrashIcon } from "@phosphor-icons/react/dist/ssr";
import { ButtonIcon, Typography } from "@ui";
import type { Link } from "../types";
import { useDeleteLink } from "../hooks/use-delete-link";
import { useCopyLink } from "../hooks/use-copy-link";
import { getShortUrl } from "@/utils/get-short-url";
import { formatDateInSaoPaulo } from "@/utils/get-formatted-date";
import { notify } from "@/libs/toast";
import { useState } from "react";
import { DeleteLinkDialog } from "./delete-link-dialog";

export function MyLinksCard({
  shortUrl,
  originalUrl,
  accessCount,
  id,
  createdAt,
}: Link) {
  const { deleteLink, deletingId } = useDeleteLink();
  const { copyLink } = useCopyLink();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const isDeleting = deletingId === id;

  const prefix = "brev.ly/";
  const shortUrlWithPrefix = prefix + shortUrl;
  const hrefShortUrl = "/" + shortUrl;
  const titleWithDate = `criado em ${formatDateInSaoPaulo({ withTime: true, isoString: createdAt })}`;

  async function handleCopy() {
    const redirectUrl = getShortUrl(shortUrl);
    await copyLink(redirectUrl);
    notify.info.linkCopied();
  }

  return (
    <>
      <li className="flex items-center justify-between gap-5 border-t border-gray-200 py-3.5">
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
          <div className="flex" title={titleWithDate}>
            <Typography
              variant="sm"
              as="span"
              className="truncate text-gray-500"
            >
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
              onClick={() => setShowDeleteDialog(true)}
              disabled={isDeleting}
              title="Deletar link"
            />
          </div>
        </div>
      </li>

      <DeleteLinkDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={() => deleteLink(id)}
        shortUrl={shortUrl}
      />
    </>
  );
}
