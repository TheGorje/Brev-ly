import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteLink } from "../api/my-links.api";
import { useState } from "react";
import { notify } from "@/libs/toast";

export function useDeleteLink() {
  const queryClient = useQueryClient();

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: deleteLink,

    onMutate(id) {
      setDeletingId(id);
    },

    onSettled() {
      setDeletingId(null);
    },

    onSuccess() {
      notify.success.linkDeleted();

      queryClient.invalidateQueries({
        queryKey: ["links"],
      });
    },

    onError() {
      notify.error.unexpected();
    },
  });

  return {
    deleteLink: mutation.mutate,
    deletingId,
  };
}
