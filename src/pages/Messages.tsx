import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Search, Send, Video } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import VideoChat from "@/components/video/VideoChat";
import ContactsList from "@/components/messages/ContactsList";

const Messages = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("project");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [videoSession, setVideoSession] = useState<{ roomId: string; userId: string } | null>(null);

  useEffect(() => {
    if (projectId) {
      setSelectedChat(projectId);
      toast.info("You can now discuss project details with the team!");
    }
  }, [projectId]);

  const messages = [
    { id: "1", senderId: "1", text: "Hey, I saw your startup idea!", timestamp: "10:30 AM" },
    { id: "2", senderId: "current-user", text: "Thanks! Would you like to know more?", timestamp: "10:32 AM" },
    { id: "3", senderId: "1", text: "Absolutely! I think we could work together.", timestamp: "10:35 AM" },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add message sending logic here
      setMessage("");
    }
  };

  const startVideoCall = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to start a video call");
        return;
      }

      if (!selectedChat) {
        toast.error("Please select a contact first");
        return;
      }

      const roomId = `video-${Date.now()}`;
      const { error } = await supabase
        .from('video_sessions')
        .insert({
          creator_id: user.id,
          participant_id: selectedChat, // selectedChat is now a proper UUID
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
      { id: "123e4567-e89b-12d3-a456-426614174000", name: "Sarah Chen", role: "Software Engineer", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" },
      { id: "223e4567-e89b-12d3-a456-426614174001", name: "Alex Kumar", role: "Product Designer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" },
      { id: "323e4567-e89b-12d3-a456-426614174002", name: "Maria Garcia", role: "VC Associate", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80" },
    ];
    return contacts.find(c => c.id === selectedChat);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900">
      <Header />
      <div className="container mx-auto px-4 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 h-[calc(100vh-120px)]">
          <ContactsList selectedChat={selectedChat} onSelectChat={setSelectedChat} />

          {/* Chat Area */}
          <div className="md:col-span-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex flex-col">
            {selectedChat ? (
              <>
                <div className="p-4 border-b border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <img
                          src={getSelectedContact()?.avatar}
                          alt={getSelectedContact()?.name}
                          className="object-cover"
                        />
                      </Avatar>
                      <div>
                        <h3 className="text-sm font-medium text-white">
                          {getSelectedContact()?.name}
                        </h3>
                        <p className="text-xs text-white/60">
                          {getSelectedContact()?.role}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={startVideoCall}
                      className="text-white hover:text-white/80"
                    >
                      <Video className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.senderId === "current-user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            msg.senderId === "current-user"
                              ? "bg-purple-600 text-white"
                              : "bg-white/20 text-white"
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <span className="text-xs opacity-60 mt-1 block">
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-4 border-t border-white/20">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex gap-2"
                  >
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                    <Button type="submit" size="icon" className="bg-purple-600 hover:bg-purple-700">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-white/60">
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