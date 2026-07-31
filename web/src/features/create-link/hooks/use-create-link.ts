import { useMutation } from "@tanstack/react-query";

import { createLink } from "../api/create-link.api";
import { queryClient } from "@/app/query-client";

export function useCreateLink() {
  return useMutation({
    mutationFn: createLink,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["links"],
      });
    },
  });
}
