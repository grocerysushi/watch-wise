import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import { AuthProvider } from "@/contexts/AuthContext";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
import Upcoming from "./pages/Upcoming";
import Error404 from "./pages/Error404";

// Configure the query client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navigation />
            <Routes>
              {/* Main routes */}
              <Route path="/" element={<Index />} />
              <Route path="/upcoming" element={<Upcoming />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/login" element={<Login />} />
              
              {/* Media routes with slugs */}
              <Route path="/movie/:id/:slug" element={<Details />} />
              <Route path="/tv/:id/:slug" element={<Details />} />
              
              {/* Legacy routes - redirect to new format */}
              <Route 
                path="/movie/:id" 
                element={<Navigate to="/movie/:id/details" replace />} 
              />
              <Route 
                path="/tv/:id" 
                element={<Navigate to="/tv/:id/details" replace />} 
              />
              
              {/* Error pages */}
              <Route path="404" element={<Error404 />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </BrowserRouter>
          <SpeedInsights />
          <Analytics />
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;