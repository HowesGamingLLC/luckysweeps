import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Games from "./pages/Games";
import Referrals from "./pages/Referrals";
import Leaderboard from "./pages/Leaderboard";
import Settings from "./pages/Settings";
import Deposits from "./pages/Deposits";
import Withdrawals from "./pages/Withdrawals";
import Notifications from "./pages/Notifications";
import AdminDashboard from "./pages/AdminDashboard";
import { useAuth } from "./hooks/use-auth";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-foreground/70">Loading...</p>
        </div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-foreground/70">Loading...</p>
        </div>
      </div>
    );
  }

  // In a real app, check for admin role
  const isAdmin = localStorage.getItem('admin') === 'true';
  return isAdmin && user ? <>{children}</> : <Navigate to="/" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/games" element={<Games />} />
          <Route
            path="/referrals"
            element={
              <ProtectedRoute>
                <Referrals />
              </ProtectedRoute>
            }
          />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/deposits"
            element={
              <ProtectedRoute>
                <Deposits />
              </ProtectedRoute>
            }
          />
          <Route
            path="/withdrawals"
            element={
              <ProtectedRoute>
                <Withdrawals />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
