import { createRoot } from "react-dom/client";
import "./index.css";
import "@fontsource-variable/inter";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import AuthInitializer from "@/providers/AuthInitializer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,

      staleTime: 1000 * 60 * 5,

      gcTime: 1000 * 60 * 30,

      refetchOnWindowFocus: false,

      refetchOnReconnect: false,

      refetchOnMount: false,
    },

    mutations: {
      retry: 1,
    },
  },
});
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <AuthInitializer>
          <App />

          <Toaster richColors position="top-right" />
        </AuthInitializer>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>,
);
