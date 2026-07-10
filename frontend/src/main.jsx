
import { createRoot } from 'react-dom/client'
import './index.css'
import "@fontsource-variable/inter";
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import AuthInitializer from "@/providers/AuthInitializer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});
createRoot(document.getElementById('root')).render(
         <QueryClientProvider client={queryClient}>
 <AuthProvider>
    <AuthInitializer>
  <BrowserRouter>
      <App />
         <Toaster richColors position="top-right" />
    </BrowserRouter>
    </AuthInitializer>
    </AuthProvider>
      </QueryClientProvider>

)
