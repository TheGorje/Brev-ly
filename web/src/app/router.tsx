import { createBrowserRouter } from "react-router";

import { routes } from "./routes";
import {
  HomePage,
  NotFoundPage,
  RedirectPage,
  LinkNotFoundPage,
} from "@/pages";

export const router = createBrowserRouter([
  {
    path: routes.home,
    element: <HomePage />,
  },
  {
    path: routes.redirect,
    element: <RedirectPage />,
  },
  {
    path: routes.notFound,
    element: <NotFoundPage />,
  },
  {
    path: routes.linkNotFound,
    element: <LinkNotFoundPage />,
  },
]);
