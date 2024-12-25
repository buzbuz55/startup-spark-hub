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
import { createMessageData } from "@/types/messages";
import { exampleMessages, exampleContacts } from "@/data/exampleMessages";

const Messages = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("project");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [videoSession, setVideoSession] = useState<{
    roomId: string;
    userId: string;
  } | null>(null);

  const { messages: realMessages, updateMessage } = useMessaging(selectedChat);
  const { isTyping, onlineUsers, sendTypingIndicator } = useChatRealtime(selectedChat);

  // Use example or real messages based on whether a chat is selected
  const messages = selectedChat ? realMessages : exampleMessages;

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

      const messageData = createMessageData(message, user.id, selectedChat);
      const { error } = await supabase.from("messages").insert(messageData);

      if (error) throw error;

      setMessage("");
      toast.success("Message sent!");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  const getSelectedContact = () => {
    return exampleContacts.find((c) => c.id === selectedChat);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 h-[calc(100vh-120px)]">
          <div className="md:col-span-1 h-full">
            <ContactsList
              selectedChat={selectedChat}
              onSelectChat={setSelectedChat}
              defaultContacts={exampleContacts}
            />
          </div>

          <div className="md:col-span-2 bg-background/95 backdrop-blur-sm rounded-lg border shadow-lg flex flex-col h-full">
            {selectedChat ? (
              <>
                <ChatHeader
                  contact={getSelectedContact()}
                  onStartVideoCall={() => {
                    toast.info("Video calls are not available in demo mode");
                  }}
                />
                <div className="flex-1 overflow-hidden">
                  <MessageList
                    messages={messages}
                    onEditMessage={updateMessage}
                    onlineUsers={onlineUsers}
                  />
                </div>
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