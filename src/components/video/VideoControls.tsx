import { Button } from "@/components/ui/button";
import { Video, Mic, MicOff, VideoOff, PhoneOff } from "lucide-react";

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
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
      <Button
        variant={isAudioEnabled ? "outline" : "destructive"}
        size="icon"
        className="rounded-full"
        onClick={onToggleAudio}
      >
        {isAudioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
      </Button>
      <Button
        variant={isVideoEnabled ? "outline" : "destructive"}
        size="icon"
        className="rounded-full"
        onClick={onToggleVideo}
      >
        {isVideoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
      </Button>
      <Button
        variant="destructive"
        size="icon"
        className="rounded-full"
        onClick={onEndCall}
      >
        <PhoneOff className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default VideoControls;