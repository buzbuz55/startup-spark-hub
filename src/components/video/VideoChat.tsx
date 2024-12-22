import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Video, PhoneOff } from "lucide-react";
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
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
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

        // Subscribe to signaling channel
        const channel = supabase
          .channel(`video-${roomId}`)
          .on('broadcast', { event: 'signal' }, ({ payload }) => {
            if (payload.userId !== userId) {
              handleSignalingData(payload.data);
            }
          })
          .subscribe();

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
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <Button
            variant="destructive"
            size="lg"
            className="rounded-full"
            onClick={handleEndCall}
          >
            <PhoneOff className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoChat;