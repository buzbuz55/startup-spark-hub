import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Video } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const StartupProgressForm = () => {
  const handleTikTokShare = () => {
    const hashtags = [
      "StartupSpark",
      "Sparkup",
      "Maketheworldabetterplace",
      "sparklife",
      "startuplife"
    ].join(" #");
    
    const tiktokUrl = `https://www.tiktok.com/upload?hashtags=${encodeURIComponent(hashtags)}`;
    window.open(tiktokUrl, '_blank');
    toast.success("Opening TikTok to share your progress!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          className="bg-[#9747FF] hover:bg-[#8033FF] text-white rounded-full px-8 py-6 flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl"
          onClick={handleTikTokShare}
        >
          <Video className="h-5 w-5" />
          Share Your Startup Progress
        </Button>
      </DialogTrigger>
    </Dialog>
  );
};

export default StartupProgressForm;