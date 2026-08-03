import { Button, Dialog, Typography } from "@ui";

interface DeleteLinkDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;
  onConfirm(): void;
  shortUrl: string;
}

export function DeleteLinkDialog({
  open,
  onOpenChange,
  onConfirm,
  shortUrl,
}: DeleteLinkDialogProps) {
  function handleConfirm() {
    onConfirm();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography variant="lg">
            Excluir o link{" "}
            <Typography variant="lg" as="span" className="text-danger">
              {shortUrl}
            </Typography>
            ?
          </Typography>

          <Typography variant="sm" className="text-gray-500">
            Essa ação não poderá ser desfeita.
          </Typography>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button variant="outlined" onClick={() => onOpenChange(false)}>
            <Typography variant="md">Cancelar</Typography>
          </Button>

          <Button onClick={handleConfirm}>
            <Typography variant="md">Excluir</Typography>
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
