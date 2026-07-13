import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import "@fontsource-variable/inter";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";

import { queryClient } from "@/lib/queryClient";
import { AuthProvider } from "@/context/AuthContext";
import AuthInitializer from "@/providers/AuthInitializer";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
    >
      <BrowserRouter>
        <AuthProvider>
          <AuthInitializer>
            <App />
            <Toaster richColors position="top-right" />
          </AuthInitializer>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </QueryClientProvider>
);