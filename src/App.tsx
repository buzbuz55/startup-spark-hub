import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import Search from "./pages/Search";
import SubmitIdea from "./pages/SubmitIdea";
import TalentPool from "./pages/TalentPool";
import VCDashboard from "./pages/VCDashboard";
import Messages from "./pages/Messages";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import FAQ from "./pages/FAQ";
import ProfileSettings from "./pages/ProfileSettings";
import StartupOpportunities from "./pages/StartupOpportunities";
import CompanyDirectory from "./pages/CompanyDirectory";
import Internships from "./pages/Internships";
import Startups from "./pages/Startups";
import Scraper from "./pages/Scraper";
import CreatorHome from "./pages/CreatorHome";
import Library from "./pages/Library";
import CofounderMatching from "./pages/CofounderMatching";
import Jobs from "./pages/Jobs";
import Apply from "./pages/Apply";
import Interviews from "./pages/Interviews";
import DigitalContract from "./pages/DigitalContract";

const App = () => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/creator" element={<CreatorHome />} />
              <Route path="/search" element={<Search />} />
              <Route path="/submit-idea" element={<SubmitIdea />} />
              <Route path="/talent-pool" element={<TalentPool />} />
              <Route path="/vc-dashboard" element={<VCDashboard />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/profile/settings" element={<ProfileSettings />} />
              <Route path="/startup-opportunities" element={<StartupOpportunities />} />
              <Route path="/companies" element={<CompanyDirectory />} />
              <Route path="/internships" element={<Internships />} />
              <Route path="/startups" element={<Startups />} />
              <Route path="/scraper" element={<Scraper />} />
              <Route path="/library" element={<Library />} />
              <Route path="/cofounder-matching" element={<CofounderMatching />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="/interviews" element={<Interviews />} />
              <Route path="/digital-contract" element={<DigitalContract />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;