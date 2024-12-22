import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home,
  Search,
  Users,
  MessageSquare,
  Calendar,
  Settings,
  Menu,
  PlusCircle
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useState } from "react";
import UserProfileMenu from "./header/UserProfileMenu";
import MobileMenu from "./header/MobileMenu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) {
    return null; // Only show mobile header on mobile devices
  }

  return (
    <>
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b h-14">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-full">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Spark✨
              </span>
            </Link>
            
            <div className="flex items-center gap-2">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <MobileMenu profile={null} />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t h-16">
        <div className="grid grid-cols-5 h-full">
          <Link to="/" className="flex flex-col items-center justify-center gap-1">
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/search" className="flex flex-col items-center justify-center gap-1">
            <Search className="h-5 w-5" />
            <span className="text-xs">Search</span>
          </Link>
          <Link to="/submit-idea" className="flex flex-col items-center justify-center">
            <div className="bg-primary rounded-full p-3 -mt-8 shadow-lg">
              <PlusCircle className="h-6 w-6 text-white" />
            </div>
          </Link>
          <Link to="/messages" className="flex flex-col items-center justify-center gap-1">
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs">Chat</span>
          </Link>
          <Link to="/profile/settings" className="flex flex-col items-center justify-center gap-1">
            <Settings className="h-5 w-5" />
            <span className="text-xs">Settings</span>
          </Link>
        </div>
      </nav>

      {/* Content Padding */}
      <div className="pb-16 pt-14" /> {/* Add padding for fixed header and nav */}
    </>
  );
};

export default Header;