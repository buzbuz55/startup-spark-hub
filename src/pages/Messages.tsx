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
import { useMessaging } from "@/hooks/use-messaging";
import { useChatRealtime } from "@/hooks/use-chat-realtime";

const Messages = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("project");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [videoSession, setVideoSession] = useState<{
    roomId: string;
    userId: string;
  } | null>(null);
  const [currentGroup, setCurrentGroup] = useState<any>(null);

  const { messages, updateMessage } = useMessaging(selectedChat);
  const { isTyping, onlineUsers, sendTypingIndicator } = useChatRealtime(
    selectedChat,
    !!currentGroup
  );

  useEffect(() => {
    if (projectId) {
      setSelectedChat(projectId);
      toast.info("You can now discuss project details with the team!");
    }
  }, [projectId]);

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

      const messageData = {
        sender_id: user.id,
        content: message,
        status: "sent",
        ...(currentGroup 
          ? { group_id: currentGroup.id }
          : { receiver_id: selectedChat }
        ),
      };

      const { error } = await supabase.from("messages").insert(messageData);

      if (error) throw error;

      setMessage("");
      toast.success("Message sent!");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  const handleLeaveGroup = async () => {
    if (!currentGroup) return;

    try {
      const { error } = await supabase
        .from("group_members")
        .delete()
        .match({ group_id: currentGroup.id, user_id: (await supabase.auth.getUser()).data.user?.id });

      if (error) throw error;

      setCurrentGroup(null);
      setSelectedChat(null);
      toast.success("Left group successfully");
    } catch (error) {
      console.error("Error leaving group:", error);
      toast.error("Failed to leave group");
    }
  };

  const handleAddMember = async () => {
    // This would typically open a dialog to select users
    toast.info("Add member functionality coming soon!");
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

      if (error) throw error;

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
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
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
            onGroupSelect={setCurrentGroup}
          />

          <div className="md:col-span-2 bg-background/95 backdrop-blur-sm rounded-lg border shadow-lg flex flex-col">
            {selectedChat ? (
              <>
                <ChatHeader
                  contact={getSelectedContact()}
                  group={currentGroup}
                  onStartVideoCall={startVideoCall}
                  onLeaveGroup={handleLeaveGroup}
                  onAddMember={handleAddMember}
                />
                <MessageList
                  messages={messages}
                  onEditMessage={updateMessage}
                  onlineUsers={onlineUsers}
                />
                <ChatInput
                  message={message}
                  setMessage={setMessage}
                  onSendMessage={handleSendMessage}
                  isTyping={isTyping}
                  onTyping={sendTypingIndicator}
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