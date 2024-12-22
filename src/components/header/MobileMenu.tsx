import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, UserCircle, LogIn, UserPlus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface MobileMenuProps {
  profile: { full_name: string | null; email: string | null } | null;
}

const MobileMenu = ({ profile }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setIsOpen(false);
      toast.success("Signed out successfully");
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error("Error signing out");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4">
          <Link to="/talent-pool" className="block p-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
            Talent Pool
          </Link>
          <Link to="/projects" className="block p-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
            Projects
          </Link>
          <Link to="/vc-dashboard" className="block p-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
            VC Network
          </Link>
          <Link to="/blog" className="block p-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
            Blog
          </Link>
          <Link to="/faq" className="block p-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
            FAQ
          </Link>
          <div className="border-t my-4"></div>
          {profile ? (
            <>
              <Button variant="ghost" className="justify-start" onClick={() => setIsOpen(false)}>
                <UserCircle className="mr-2 h-4 w-4" />
                Profile Settings
              </Button>
              <Button variant="ghost" className="justify-start" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsOpen(false)}>
                <Button variant="default" className="w-full justify-start">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;