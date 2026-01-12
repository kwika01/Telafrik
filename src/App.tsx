import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Watchlist from "./pages/Watchlist";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ChatWidget />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/companies" element={<Directory />} />
          <Route path="/startup/:slug" element={<StartupProfile />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/investor/:slug" element={<InvestorProfile />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/search" element={<Search />} />
          <Route path="/sectors" element={<Sectors />} />
          <Route path="/sectors/:slug" element={<SectorPage />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/founders" element={<Founders />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/signals" element={<Signals />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/auth" element={<Auth />} />
          {/* Hidden admin route */}
          <Route path="/lum0ra-admin-x7k9" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
