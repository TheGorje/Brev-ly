import { Button, Dialog, Typography } from "@ui";

interface DeleteLinkDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;
  onConfirm(): void;
}

export function DeleteLinkDialog({
  open,
  onOpenChange,
  onConfirm,
}: DeleteLinkDialogProps) {
  function handleConfirm() {
    onConfirm();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography variant="lg">Excluir link?</Typography>

          <Typography variant="sm" className="text-gray-500">
            Essa ação não poderá ser desfeita.
          </Typography>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            onClick={() => onOpenChange(false)}
            className="flex h-12 cursor-pointer items-center justify-center gap-3 rounded-lg border bg-transparent px-5 opacity-50 transition-all ease-out hover:opacity-100"
          >
            Cancelar
          </Button>

          <Button onClick={handleConfirm}>Excluir</Button>
        </div>
      </div>
    </Dialog>
  );
}
