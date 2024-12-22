import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import VideoChat from "@/components/video/VideoChat";
import ContactsList from "@/components/messages/ContactsList";
import ChatHeader from "@/components/messages/ChatHeader";
import ChatInput from "@/components/messages/ChatInput";
import MessageList from "@/components/messages/MessageList";
import type { Message, MessageStatus } from "@/types/messages";

const Messages = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("project");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [videoSession, setVideoSession] = useState<{
    roomId: string;
    userId: string;
  } | null>(null);

  useEffect(() => {
    if (projectId) {
      setSelectedChat(projectId);
      toast.info("You can now discuss project details with the team!");
    }
  }, [projectId]);

  useEffect(() => {
    if (!selectedChat) return;

    const channel = supabase.channel(`typing:${selectedChat}`)
      .on('broadcast', { event: 'typing' }, ({ payload }) => {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedChat]);

  const messages: Message[] = [
    {
      id: "1",
      senderId: "1",
      text: "Hey, I saw your startup idea! 👋",
      timestamp: "10:30 AM",
      status: "read",
    },
    {
      id: "2",
      senderId: "current-user",
      text: "Thanks! Would you like to know more? 😊",
      timestamp: "10:32 AM",
      status: "delivered",
    },
    {
      id: "3",
      senderId: "1",
      text: "Absolutely! I think we could work together. 🚀",
      timestamp: "10:35 AM",
      status: "sent",
    },
  ];

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      
      if (!user || !selectedChat) {
        toast.error("Unable to send message");
        return;
      }

      const { error } = await supabase.from("messages").insert({
        sender_id: user.id,
        receiver_id: selectedChat,
        content: message,
        status: "sent",
      });

      if (error) throw error;

      setMessage("");
      toast.success("Message sent!");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  const handleTyping = async () => {
    if (!selectedChat) return;

    try {
      await supabase.channel(`typing:${selectedChat}`).send({
        type: 'broadcast',
        event: 'typing',
        payload: { typing: true },
      });
    } catch (error) {
      console.error("Error sending typing indicator:", error);
    }
  };

  const startVideoCall = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to start a video call");
        return;
      }

      if (!selectedChat) {
        toast.error("Please select a contact first");
        return;
      }

      const roomId = `video-${Date.now()}`;
      const { error } = await supabase.from("video_sessions").insert({
        creator_id: user.id,
        participant_id: selectedChat,
        room_id: roomId,
      });

      if (error) {
        console.error("Error creating video session:", error);
        toast.error("Failed to start video call");
        return;
      }

      setVideoSession({ roomId, userId: user.id });
      toast.success("Video call started!");
    } catch (error) {
      console.error("Error starting video call:", error);
      toast.error("Failed to start video call");
    }
  };

  const getSelectedContact = () => {
    const contacts = [
      {
        id: "d7bed21c-5a38-4c44-87f5-7b8f3f3c2421",
        name: "Sarah Chen",
        role: "Software Engineer",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      },
      {
        id: "e9be0901-6a77-4b55-9644-3a25b56a90c9",
        name: "Alex Kumar",
        role: "Product Designer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      },
      {
        id: "f1c3a45b-2d89-4e67-8a31-9c45b7c8d3ef",
        name: "Maria Garcia",
        role: "VC Associate",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      },
    ];
    return contacts.find((c) => c.id === selectedChat);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 h-[calc(100vh-120px)]">
          <ContactsList
            selectedChat={selectedChat}
            onSelectChat={setSelectedChat}
          />

          <div className="md:col-span-2 bg-background/95 backdrop-blur-sm rounded-lg border shadow-lg flex flex-col">
            {selectedChat ? (
              <>
                <ChatHeader
                  contact={getSelectedContact()}
                  onStartVideoCall={startVideoCall}
                />
                <MessageList messages={messages} />
                <ChatInput
                  message={message}
                  setMessage={setMessage}
                  onSendMessage={handleSendMessage}
                  isTyping={isTyping}
                />
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                Select a conversation to start messaging
              </div>
            )}
          </div>
        </div>
      </div>

      {videoSession && (
        <VideoChat
          roomId={videoSession.roomId}
          userId={videoSession.userId}
          onClose={() => setVideoSession(null)}
        />
      )}
    </div>
  );
};

export default Messages;