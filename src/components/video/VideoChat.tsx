import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import VideoControls from "./VideoControls";
import VideoStream from "./VideoStream";

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
        // Request both audio and video permissions upfront
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            facingMode: "user"
          },
          audio: true,
        });
        
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

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

        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });

        pc.ontrack = (event) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
            setRemoteStream(event.streams[0]);
          }
        };

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            sendSignalingData({ candidate: event.candidate });
          }
        };

        // Subscribe to the signaling channel
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
      } catch (error: any) {
        console.error("Error initializing video chat:", error);
        if (error.name === "NotAllowedError") {
          toast.error("Please allow camera and microphone access to use video chat");
        } else {
          toast.error("Failed to initialize video chat");
        }
      }
    };

    initializeVideoChat();

    return () => {
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center">
      <div className="relative w-full max-w-7xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 aspect-video">
          <VideoStream 
            videoRef={remoteVideoRef} 
            isSelf={false} 
            isMainStream={!remoteStream}
            label="Remote User"
          />
          <VideoStream 
            videoRef={localVideoRef} 
            isSelf={true} 
            isMainStream={!!remoteStream}
            label="You"
          />
        </div>
        <div className="absolute inset-x-0 bottom-12 flex justify-center">
          <div className="bg-black/20 backdrop-blur-lg rounded-full p-4">
            <VideoControls
              isAudioEnabled={isAudioEnabled}
              isVideoEnabled={isVideoEnabled}
              onToggleAudio={toggleAudio}
              onToggleVideo={toggleVideo}
              onEndCall={handleEndCall}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoChat;