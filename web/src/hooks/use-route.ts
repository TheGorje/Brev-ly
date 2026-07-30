import { useParams, useSearchParams } from "react-router";

export function useRoute() {
  const { shortUrl } = useParams<{ shortUrl: string }>();
  const [searchParams] = useSearchParams();

  return {
    shortUrl,
    searchParams,
  };
}
