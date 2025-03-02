import { Button } from "@/components/ui/button";
import { Video, VideoOff, Mic, MicOff, PhoneOff } from "lucide-react";

interface VideoControlsProps {
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onEndCall: () => void;
}

const VideoControls = ({
  isAudioEnabled,
  isVideoEnabled,
  onToggleAudio,
  onToggleVideo,
  onEndCall,
}: VideoControlsProps) => {
  return (
    <div className="flex items-center gap-8">
      <Button
        variant={isAudioEnabled ? "outline" : "destructive"}
        size="icon"
        className="h-16 w-16 rounded-full border-2 shadow-lg bg-white/10 backdrop-blur-md hover:scale-105 transition-all"
        onClick={onToggleAudio}
      >
        {isAudioEnabled ? <Mic className="h-7 w-7" /> : <MicOff className="h-7 w-7" />}
      </Button>
      <Button
        variant={isVideoEnabled ? "outline" : "destructive"}
        size="icon"
        className="h-16 w-16 rounded-full border-2 shadow-lg bg-white/10 backdrop-blur-md hover:scale-105 transition-all"
        onClick={onToggleVideo}
      >
        {isVideoEnabled ? <Video className="h-7 w-7" /> : <VideoOff className="h-7 w-7" />}
      </Button>
      <Button
        variant="destructive"
        size="icon"
        className="h-16 w-16 rounded-full shadow-lg hover:scale-105 transition-all"
        onClick={onEndCall}
      >
        <PhoneOff className="h-7 w-7" />
      </Button>
    </div>
  );
};

export default VideoControls;