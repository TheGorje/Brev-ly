import { RouterProvider } from "react-router";

import { router } from "./router";
import { Provider } from "./provider";

export function App() {
  return (
    <main className="h-full w-full px-3 py-8">
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </main>
  );
}
