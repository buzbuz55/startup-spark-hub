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
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
      <Button
        variant={isAudioEnabled ? "outline" : "destructive"}
        size="icon"
        className="h-12 w-12 rounded-full border-2"
        onClick={onToggleAudio}
      >
        {isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
      </Button>
      <Button
        variant={isVideoEnabled ? "outline" : "destructive"}
        size="icon"
        className="h-12 w-12 rounded-full border-2"
        onClick={onToggleVideo}
      >
        {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
      </Button>
      <Button
        variant="destructive"
        size="icon"
        className="h-12 w-12 rounded-full"
        onClick={onEndCall}
      >
        <PhoneOff className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default VideoControls;