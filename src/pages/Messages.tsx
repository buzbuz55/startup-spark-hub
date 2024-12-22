import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Search, Send } from "lucide-react";
import { toast } from "sonner";

const Messages = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("project");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (projectId) {
      setSelectedChat(projectId);
      toast.info("You can now discuss project details with the team!");
    }
  }, [projectId]);

  const contacts = [
    { id: "1", name: "Sarah Chen", role: "Software Engineer", lastMessage: "Hey, I saw your startup idea!", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" },
    { id: "2", name: "Alex Kumar", role: "Product Designer", lastMessage: "Would love to collaborate!", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" },
    { id: "3", name: "Maria Garcia", role: "VC Associate", lastMessage: "Let's schedule a call", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80" },
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900">
      <Header />
      <div className="container mx-auto px-4 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 h-[calc(100vh-120px)]">
          {/* Contacts List */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>
            </div>
            <ScrollArea className="h-[calc(100vh-240px)]">
              <div className="space-y-2 p-4">
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedChat(contact.id)}
                    className={`w-full p-3 rounded-lg transition-colors ${
                      selectedChat === contact.id
                        ? "bg-white/20"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <img src={contact.avatar} alt={contact.name} className="object-cover" />
                      </Avatar>
                      <div className="text-left">
                        <h3 className="text-sm font-medium text-white">{contact.name}</h3>
                        <p className="text-xs text-white/60">{contact.role}</p>
                        <p className="text-xs text-white/80 mt-1">{contact.lastMessage}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex flex-col">
            {selectedChat ? (
              <>
                <div className="p-4 border-b border-white/20">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <img
                        src={contacts.find(c => c.id === selectedChat)?.avatar}
                        alt={contacts.find(c => c.id === selectedChat)?.name}
                        className="object-cover"
                      />
                    </Avatar>
                    <div>
                      <h3 className="text-sm font-medium text-white">
                        {contacts.find(c => c.id === selectedChat)?.name}
                      </h3>
                      <p className="text-xs text-white/60">
                        {contacts.find(c => c.id === selectedChat)?.role}
                      </p>
                    </div>
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
    </div>
  );
};

export default Messages;
