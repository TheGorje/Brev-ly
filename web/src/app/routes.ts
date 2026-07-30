export const routes = {
  home: "/",

  redirect: "/:shortUrl",

  redirectTo(shortUrl: string) {
    return `/${shortUrl}`;
  },
  linkNotFound: "/not-found",

  notFound: "*",
} as const;
