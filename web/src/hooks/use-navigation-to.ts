import { useNavigate } from "react-router";

import { routes } from "@/app/routes";

export function useNavigateTo() {
  const navigate = useNavigate();

  return {
    home() {
      navigate(routes.home);
    },

    redirect(shortUrl: string) {
      navigate(`/${shortUrl}`);
    },

    linkNotFound() {
      navigate(routes.linkNotFound, {
        replace: true,
      });
    },

    back() {
      navigate(-1);
    },
  };
}
