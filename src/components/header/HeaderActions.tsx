import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Video, Calendar } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import VideoChat from "../video/VideoChat";
import MeetingDialog from "../meetings/MeetingDialog";

const HeaderActions = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isMeetingDialogOpen, setIsMeetingDialogOpen] = useState(false);

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
    <>
      <Button 
        variant="ghost" 
        size="icon"
        className="hidden md:flex relative group"
        onClick={() => setIsMeetingDialogOpen(true)}
      >
        <Calendar className="w-4 h-4" />
        <span className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
          Schedule Meeting
        </span>
      </Button>

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

      {isMeetingDialogOpen && (
        <MeetingDialog
          open={isMeetingDialogOpen}
          onOpenChange={setIsMeetingDialogOpen}
        />
      )}

      <Link to="/messages">
        <Button variant="ghost" size="icon">
          <MessageSquare className="w-4 h-4" />
        </Button>
      </Link>

      {isVideoModalOpen && (
        <VideoChat
          roomId={`room-${Math.random().toString(36).substring(7)}`}
          userId="user-123"
          onClose={() => setIsVideoModalOpen(false)}
        />
      )}
    </>
  );
};

export default HeaderActions;