import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowUpRight, Video, Calendar } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { motion } from "framer-motion";
import { useState } from "react";
import UserProfileMenu from "./header/UserProfileMenu";
import MobileMenu from "./header/MobileMenu";
import ScheduleMeeting from "./meetings/ScheduleMeeting";
import VideoChat from "./video/VideoChat";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleStartVideoChat = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to start a video chat");
        return;
      }

      const roomId = `room-${Math.random().toString(36).substring(7)}`;
      setIsVideoModalOpen(true);

      // Create a video session in the database
      const { error } = await supabase
        .from('video_sessions')
        .insert([
          {
            creator_id: user.id,
            room_id: roomId,
          }
        ]);

      if (error) throw error;

    } catch (error) {
      console.error('Error starting video chat:', error);
      toast.error("Failed to start video chat");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary transition-colors duration-300">
            Startup Spark Hub ✨
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/talent-pool">
              <Button variant="ghost">Talent Pool</Button>
            </Link>
            <Link to="/projects">
              <Button variant="ghost">Projects</Button>
            </Link>
            <Link to="/submit-idea">
              <Button variant="default" className="gap-2">
                <ArrowUpRight className="w-4 h-4" />
                Apply
              </Button>
            </Link>
          </div>

          <nav className="flex items-center gap-4">
            <ScheduleMeeting />
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex relative group"
              onClick={handleStartVideoChat}
            >
              <Video className="w-4 h-4" />
              <span className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                Start Video Call
              </span>
            </Button>

            <motion.button
              className="relative w-14 h-8 rounded-full bg-secondary p-1 shadow-inner transition-colors duration-300"
              onClick={toggleTheme}
              animate={{
                backgroundColor: theme === 'dark' ? '#1a1f2c' : '#f1f1f1'
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="w-6 h-6 rounded-full bg-primary shadow-md"
                animate={{
                  x: theme === 'dark' ? 24 : 0,
                  rotate: theme === 'dark' ? 45 : 0
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  duration: 0.3
                }}
              />
            </motion.button>

            <Link to="/messages" className="hidden sm:block">
              <Button variant="ghost" size="icon">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </Link>

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