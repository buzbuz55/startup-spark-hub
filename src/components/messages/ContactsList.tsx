import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Contact {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  avatar: string;
  online?: boolean;
}

interface ContactsListProps {
  selectedChat: string | null;
  onSelectChat: (id: string) => void;
}

const ContactsList = ({ selectedChat, onSelectChat }: ContactsListProps) => {
  // Using the actual user IDs from your auth.users table
  const contacts: Contact[] = [
    {
      id: "d7bed21c-5a38-4c44-87f5-7b8f3f3c2421",
      name: "Sarah Chen",
      role: "Software Engineer",
      lastMessage: "Hey, I saw your startup idea!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      online: true
    },
    {
      id: "e9be0901-6a77-4b55-9644-3a25b56a90c9",
      name: "Alex Kumar",
      role: "Product Designer",
      lastMessage: "Would love to collaborate!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      online: false
    },
    {
      id: "f1c3a45b-2d89-4e67-8a31-9c45b7c8d3ef",
      name: "Maria Garcia",
      role: "VC Associate",
      lastMessage: "Let's schedule a call",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      online: true
    },
  ];

  return (
    <div className="bg-background/95 backdrop-blur-sm rounded-lg border shadow-lg">
      <div className="p-4 border-b">
        <h2 className="font-semibold mb-4 text-lg">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-9 bg-background"
          />
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-240px)]">
        <div className="space-y-1 p-2">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => onSelectChat(contact.id)}
              className={cn(
                "w-full p-3 rounded-lg transition-colors flex items-center gap-3 relative",
                selectedChat === contact.id
                  ? "bg-primary/10 hover:bg-primary/15"
                  : "hover:bg-muted"
              )}
            >
              <div className="relative">
                <Avatar className="h-12 w-12 border-2 border-background">
                  <img src={contact.avatar} alt={contact.name} className="object-cover" />
                </Avatar>
                {contact.online && (
                  <div className="absolute bottom-0 right-0">
                    <Circle className="h-3 w-3 fill-green-500 text-green-500" />
                  </div>
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">{contact.name}</h3>
                  <span className="text-xs text-muted-foreground">12:45 PM</span>
                </div>
                <p className="text-xs text-muted-foreground">{contact.role}</p>
                <p className="text-xs mt-1 truncate max-w-[200px]">{contact.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ContactsList;