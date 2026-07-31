import { toast } from "sonner";

const DEFAULT_DURATION = 1800;

function success(message: string) {
  toast.success(message, {
    duration: DEFAULT_DURATION,
  });
}

function error(message: string) {
  toast.error(message, {
    duration: DEFAULT_DURATION,
  });
}

function info(message: string) {
  toast.info(message, {
    duration: DEFAULT_DURATION,
  });
}

const promiseNotify = {
  downloadCSV(promise: Promise<unknown>) {
    return toast.promise(promise, {
      loading: "Preparando arquivo...",
      success: "Download iniciado.",
    });
  },
};

const errorNotify = {
  linkAlreadyExists() {
    error("Este link encurtado já está em uso.");
  },

  invalidLink() {
    error("Verifique os dados informados.");
  },

  emptyCSV() {
    error("Não há links para exportar.");
  },

  unexpected() {
    error("Ocorreu um erro inesperado.");
  },
};

const successNotify = {
  linkCreated() {
    success("Link criado com sucesso.");
  },

  linkDeleted() {
    success("Link removido com sucesso.");
  },

  csvDownloadStarted() {
    success("Download iniciado.");
  },
};

const infoNotify = {
  linkCopied() {
    info("Link copiado para a área de transferência.");
  },
};

export const notify = {
  success: successNotify,
  error: errorNotify,
  info: infoNotify,
  promise: promiseNotify,
};
