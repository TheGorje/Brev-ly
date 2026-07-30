import { RouterProvider } from "react-router";

import { router } from "./router";

export function App() {
  return (
    <main className="h-screen w-screen px-3 py-8">
      <RouterProvider router={router} />
    </main>
  );
}
