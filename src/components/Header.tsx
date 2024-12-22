import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Video, Menu, ChevronDown, Calendar } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { motion } from "framer-motion";
import { useState } from "react";
import UserProfileMenu from "./header/UserProfileMenu";
import MobileMenu from "./header/MobileMenu";
import VideoChat from "./video/VideoChat";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleStartVideoChat = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to start a video chat");
        return;
      }

      const roomId = `room-${Math.random().toString(36).substring(7)}`;
      setIsVideoModalOpen(true);

      const { error } = await supabase
        .from('video_sessions')
        .insert([{ creator_id: user.id, room_id: roomId }]);

      if (error) throw error;
    } catch (error) {
      console.error('Error starting video chat:', error);
      toast.error("Failed to start video chat");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Spark✨
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Discover</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-2 p-4 w-[200px]">
                      <Link to="/talent-pool" className="block px-4 py-2 hover:bg-accent rounded-md">
                        Talent Pool
                      </Link>
                      <Link to="/projects" className="block px-4 py-2 hover:bg-accent rounded-md">
                        Projects
                      </Link>
                      <Link to="/blog" className="block px-4 py-2 hover:bg-accent rounded-md">
                        Blog
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-2 p-4 w-[200px]">
                      <Link to="/about" className="block px-4 py-2 hover:bg-accent rounded-md">
                        About Us
                      </Link>
                      <Link to="/faq" className="block px-4 py-2 hover:bg-accent rounded-md">
                        FAQ
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <nav className="flex items-center gap-2 md:gap-4">
            {!isMobile && (
              <>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hidden md:flex relative group"
                  onClick={handleStartVideoChat}
                >
                  <Video className="w-4 h-4" />
                  <span className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Start Video Call
                  </span>
                </Button>
                <Link to="/messages">
                  <Button variant="ghost" size="icon">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/meetings">
                  <Button variant="ghost" size="icon" className="relative group">
                    <Calendar className="w-4 h-4" />
                    <span className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                      Calendar
                    </span>
                  </Button>
                </Link>
              </>
            )}

            <motion.button
              className="relative w-12 h-6 rounded-full bg-secondary p-1 shadow-inner transition-colors duration-300"
              onClick={toggleTheme}
              animate={{
                backgroundColor: theme === 'dark' ? '#1a1f2c' : '#f1f1f1'
              }}
            >
              <motion.div
                className="w-4 h-4 rounded-full bg-primary shadow-md"
                animate={{
                  x: theme === 'dark' ? 24 : 0,
                  rotate: theme === 'dark' ? 45 : 0
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
              />
            </motion.button>

            <div className="hidden md:block">
              <UserProfileMenu />
            </div>

            <MobileMenu profile={null} />
          </nav>
        </div>
      </div>

      {isVideoModalOpen && (
        <VideoChat
          roomId={`room-${Math.random().toString(36).substring(7)}`}
          userId="user-123"
          onClose={() => setIsVideoModalOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;