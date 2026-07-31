import { useMutation } from "@tanstack/react-query";

import { downloadLinksCSV } from "../api/my-links.api";
import { notify } from "@/libs/toast";
import { isAxiosError } from "axios";

export function useDownloadCSV() {
  const mutation = useMutation({
    mutationFn: downloadLinksCSV,

    onSuccess({ url }) {
      openCSV(url);
    },
  });

  function openCSV(url: string) {
    const link = document.createElement("a");

    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    document.body.appendChild(link);

    link.click();

    link.remove();
  }

  async function downloadCSV() {
    const promise = mutation.mutateAsync();

    notify.promise.downloadCSV(promise);

    try {
      await promise;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 422) {
          notify.error.emptyCSV();
          return;
        }
      }

      notify.error.unexpected();
    }
  }
  return {
    downloadCSV,
    isDownloading: mutation.isPending,
  };
}
