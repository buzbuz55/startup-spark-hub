import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, Globe, Search as SearchIcon, Calendar, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <div className="min-h-screen flex flex-col bg-background">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              {/* Static Header */}
              <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 h-16">
                  <div className="flex items-center justify-between h-full">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                      <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent hover:opacity-90 transition-opacity">
                        StartupSparkHub
                      </span>
                    </Link>

                    {/* Center Navigation Icons */}
                    <div className="hidden md:flex items-center gap-4">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to="/search">
                          <SearchIcon className="h-5 w-5" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link to="/calendar">
                          <Calendar className="h-5 w-5" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link to="/video">
                          <Video className="h-5 w-5" />
                        </Link>
                      </Button>
                    </div>

                    {/* Right side items */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Link to="/login">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="gap-2 hover:bg-primary/10"
                          >
                            <LogIn className="h-4 w-4" />
                            <span className="hidden sm:inline">Login</span>
                          </Button>
                        </Link>
                        <Link to="/signup">
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="gap-2 shadow-sm hover:shadow-md transition-shadow"
                          >
                            <UserPlus className="h-4 w-4" />
                            <span className="hidden sm:inline">Sign Up</span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </header>

              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
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
                </Routes>
              </main>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;