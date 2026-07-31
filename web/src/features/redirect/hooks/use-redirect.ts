import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { getOriginalUrl } from "../api/redirect.api";
import { useNavigateTo } from "@/hooks/use-navigation-to";

export function useRedirect(shortUrl: string) {
  const { linkNotFound } = useNavigateTo();

  const query = useQuery({
    queryKey: ["redirect", shortUrl],

    queryFn: () => getOriginalUrl(shortUrl),

    enabled: !!shortUrl,

    retry: false,
  });

  useEffect(() => {
    if (!query.data) return;

    window.location.replace(query.data.originalUrl);
  }, [query.data]);

  useEffect(() => {
    if (!query.isError) return;

    linkNotFound();
  }, [query.isError, linkNotFound]);

  return query;
}
