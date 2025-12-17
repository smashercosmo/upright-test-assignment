import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/trpc";
import { RouterProvider, createBrowserRouter } from "react-router";
import { config } from "./routes/config";

export const router = createBrowserRouter([config]);

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
