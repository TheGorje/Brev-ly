import { RouterProvider } from "react-router";

import { router } from "./router";
import { Provider } from "./provider";

export function App() {
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
}
