import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserCircle, LogIn, UserPlus, MessageSquare } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  // TODO: Replace with actual auth state
  const isLoggedIn = false;
  const userProfile = {
    name: "John Doe",
    role: "Venture Capitalist",
    avatar: "/placeholder.svg"
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-purple-600">
            Startup Spark Hub ✨
          </Link>
          
          <nav className="flex items-center gap-4">
            <Link to="/submit-idea">
              <Button variant="ghost">Submit Idea 💡</Button>
            </Link>
            <Link to="/talent-pool">
              <Button variant="ghost">Talent Pool 🎯</Button>
            </Link>
            <Link to="/vc-dashboard">
              <Button variant="ghost">VC Dashboard 📊</Button>
            </Link>
            <Link to="/messages">
              <Button variant="ghost">
                <MessageSquare className="w-4 h-4 mr-2" />
                Messages
              </Button>
            </Link>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <UserCircle className="w-5 h-5" />
                    {userProfile.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                  <DropdownMenuItem>Portfolio</DropdownMenuItem>
                  <DropdownMenuItem>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" className="gap-2">
                    <LogIn className="w-4 h-4" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="default" className="gap-2">
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;