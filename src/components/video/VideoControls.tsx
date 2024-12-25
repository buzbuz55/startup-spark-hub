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
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6">
      <Button
        variant={isAudioEnabled ? "outline" : "destructive"}
        size="icon"
        className="h-14 w-14 rounded-full border-2 shadow-lg bg-white/10 backdrop-blur-md hover:scale-105 transition-all"
        onClick={onToggleAudio}
      >
        {isAudioEnabled ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
      </Button>
      <Button
        variant={isVideoEnabled ? "outline" : "destructive"}
        size="icon"
        className="h-14 w-14 rounded-full border-2 shadow-lg bg-white/10 backdrop-blur-md hover:scale-105 transition-all"
        onClick={onToggleVideo}
      >
        {isVideoEnabled ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
      </Button>
      <Button
        variant="destructive"
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg hover:scale-105 transition-all"
        onClick={onEndCall}
      >
        <PhoneOff className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default VideoControls;