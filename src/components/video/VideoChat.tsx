import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Video, Mic, MicOff, VideoOff, PhoneOff } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface VideoChatProps {
  roomId: string;
  userId: string;
  onClose: () => void;
}

const VideoChat = ({ roomId, userId, onClose }: VideoChatProps) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const initializeVideoChat = async () => {
      try {
        // Get local video stream
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Initialize WebRTC peer connection
        const pc = new RTCPeerConnection({
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            {
              urls: "turn:numb.viagenie.ca",
              username: "webrtc@live.com",
              credential: "muazkh"
            }
          ],
        });
        setPeerConnection(pc);

        // Add local stream to peer connection
        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });

        // Handle incoming remote stream
        pc.ontrack = (event) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
            setRemoteStream(event.streams[0]);
          }
        };

        // Handle ICE candidates
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            sendSignalingData({ candidate: event.candidate });
          }
        };

        // Subscribe to signaling channel
        const channel = supabase
          .channel(`video-${roomId}`)
          .on('broadcast', { event: 'signal' }, ({ payload }) => {
            if (payload.userId !== userId) {
              handleSignalingData(payload.data);
            }
          })
          .subscribe();

        // Create and send offer
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        sendSignalingData(offer);

        return () => {
          channel.unsubscribe();
        };
      } catch (error) {
        console.error("Error initializing video chat:", error);
        toast.error("Failed to initialize video chat");
      }
    };

    initializeVideoChat();

    return () => {
      // Cleanup
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (peerConnection) {
        peerConnection.close();
      }
    };
  }, [roomId, userId]);

  const handleSignalingData = async (data: any) => {
    if (!peerConnection) return;

    try {
      if (data.type === 'offer') {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        sendSignalingData(answer);
      } else if (data.type === 'answer') {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data));
      } else if (data.candidate) {
        await peerConnection.addIceCandidate(new RTCIceCandidate(data));
      }
    } catch (error) {
      console.error("Error handling signaling data:", error);
    }
  };

  const sendSignalingData = async (data: any) => {
    await supabase.channel(`video-${roomId}`).send({
      type: 'broadcast',
      event: 'signal',
      payload: { userId, data },
    });
  };

  const toggleAudio = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !isAudioEnabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoEnabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const handleEndCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    if (peerConnection) {
      peerConnection.close();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-4xl p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full rounded-lg bg-black"
            />
            <span className="absolute bottom-2 left-2 text-white text-sm bg-black/50 px-2 py-1 rounded">
              You
            </span>
          </div>
          <div className="relative">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg bg-black"
            />
            <span className="absolute bottom-2 left-2 text-white text-sm bg-black/50 px-2 py-1 rounded">
              Remote User
            </span>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
          <Button
            variant={isAudioEnabled ? "outline" : "destructive"}
            size="icon"
            className="rounded-full"
            onClick={toggleAudio}
          >
            {isAudioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </Button>
          <Button
            variant={isVideoEnabled ? "outline" : "destructive"}
            size="icon"
            className="rounded-full"
            onClick={toggleVideo}
          >
            {isVideoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
          </Button>
          <Button
            variant="destructive"
            size="icon"
            className="rounded-full"
            onClick={handleEndCall}
          >
            <PhoneOff className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoChat;