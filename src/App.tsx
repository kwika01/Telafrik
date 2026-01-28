import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ScrollToTop from "@/components/common/ScrollToTop";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Directory from "./pages/Directory";
import StartupProfile from "./pages/StartupProfile";
import Investors from "./pages/Investors";
import InvestorProfile from "./pages/InvestorProfile";
import Trending from "./pages/Trending";
import Search from "./pages/Search";
import Sectors from "./pages/Sectors";
import SectorPage from "./pages/SectorPage";
import Countries from "./pages/Countries";
import Founders from "./pages/Founders";
import Deals from "./pages/Deals";
import Signals from "./pages/Signals";
import Reports from "./pages/Reports";
import Auth from "./pages/Auth";
import Pricing from "./pages/Pricing";
import Methodology from "./pages/Methodology";
import Compare from "./pages/Compare";
import About from "./pages/About";
import Watchlist from "./pages/Watchlist";
import Ask from "./pages/Ask";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Konekt from "./pages/Konekt";
import KonektMatches from "./pages/KonektMatches";
import KonektIntros from "./pages/KonektIntros";
import KonektConnections from "./pages/KonektConnections";
import KonektAfrikLanding from "./pages/KonektAfrikLanding";
import KonektAfrikMatch from "./pages/KonektAfrikMatch";
import KonektAfrikResults from "./pages/KonektAfrikResults";
import KonektAfrikIntros from "./pages/KonektAfrikIntros";
import AdminIntros from "./pages/AdminIntros";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <ChatWidget />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="/about" element={<About />} />
            
            {/* Protected routes - require authentication */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/directory" element={
              <ProtectedRoute>
                <Directory />
              </ProtectedRoute>
            } />
            <Route path="/companies" element={
              <ProtectedRoute>
                <Directory />
              </ProtectedRoute>
            } />
            <Route path="/startup/:slug" element={
              <ProtectedRoute>
                <StartupProfile />
              </ProtectedRoute>
            } />
            <Route path="/investors" element={
              <ProtectedRoute>
                <Investors />
              </ProtectedRoute>
            } />
            <Route path="/investor/:slug" element={
              <ProtectedRoute>
                <InvestorProfile />
              </ProtectedRoute>
            } />
            <Route path="/trending" element={
              <ProtectedRoute>
                <Trending />
              </ProtectedRoute>
            } />
            <Route path="/search" element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            } />
            <Route path="/sectors" element={
              <ProtectedRoute>
                <Sectors />
              </ProtectedRoute>
            } />
            <Route path="/sectors/:slug" element={
              <ProtectedRoute>
                <SectorPage />
              </ProtectedRoute>
            } />
            <Route path="/countries" element={
              <ProtectedRoute>
                <Countries />
              </ProtectedRoute>
            } />
            <Route path="/founders" element={
              <ProtectedRoute>
                <Founders />
              </ProtectedRoute>
            } />
            <Route path="/deals" element={
              <ProtectedRoute>
                <Deals />
              </ProtectedRoute>
            } />
            <Route path="/signals" element={
              <ProtectedRoute>
                <Signals />
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            } />
            <Route path="/compare" element={
              <ProtectedRoute>
                <Compare />
              </ProtectedRoute>
            } />
            <Route path="/watchlist" element={
              <ProtectedRoute>
                <Watchlist />
              </ProtectedRoute>
            } />
            <Route path="/ask" element={
              <ProtectedRoute>
                <Ask />
              </ProtectedRoute>
            } />
            
            {/* KonektAfrik - connections & intros */}
            <Route path="/konekt" element={
              <ProtectedRoute>
                <Konekt />
              </ProtectedRoute>
            } />
            <Route path="/konekt/matches" element={
              <ProtectedRoute>
                <KonektMatches />
              </ProtectedRoute>
            } />
            <Route path="/konekt/intros" element={
              <ProtectedRoute>
                <KonektIntros />
              </ProtectedRoute>
            } />
            <Route path="/konekt/connections" element={
              <ProtectedRoute>
                <KonektConnections />
              </ProtectedRoute>
            } />
            
            {/* KonektAfrik AI Matching */}
            <Route path="/konektafrik" element={<KonektAfrikLanding />} />
            <Route path="/konekt/match" element={
              <ProtectedRoute>
                <KonektAfrikMatch />
              </ProtectedRoute>
            } />
            <Route path="/konekt/results" element={
              <ProtectedRoute>
                <KonektAfrikResults />
              </ProtectedRoute>
            } />
            <Route path="/konekt/my-intros" element={
              <ProtectedRoute>
                <KonektAfrikIntros />
              </ProtectedRoute>
            } />
            
            {/* Hidden admin routes */}
            <Route path="/lum0ra-admin-x7k9" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/admin/intros" element={
              <ProtectedRoute>
                <AdminIntros />
              </ProtectedRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
