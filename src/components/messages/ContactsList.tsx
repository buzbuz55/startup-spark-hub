import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  avatar: string;
}

interface ContactsListProps {
  selectedChat: string | null;
  onSelectChat: (id: string) => void;
}

const ContactsList = ({ selectedChat, onSelectChat }: ContactsListProps) => {
  // Using the actual user IDs from your auth.users table
  const contacts: Contact[] = [
    {
      id: "d7bed21c-5a38-4c44-87f5-7b8f3f3c2421",  // Replace with an actual user ID from your auth.users table
      name: "Sarah Chen",
      role: "Software Engineer",
      lastMessage: "Hey, I saw your startup idea!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    {
      id: "e9be0901-6a77-4b55-9644-3a25b56a90c9",  // Replace with an actual user ID from your auth.users table
      name: "Alex Kumar",
      role: "Product Designer",
      lastMessage: "Would love to collaborate!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    {
      id: "f1c3a45b-2d89-4e67-8a31-9c45b7c8d3ef",  // Replace with an actual user ID from your auth.users table
      name: "Maria Garcia",
      role: "VC Associate",
      lastMessage: "Let's schedule a call",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    },
  ];

  return (
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
              onClick={() => onSelectChat(contact.id)}
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
  );
};

export default ContactsList;