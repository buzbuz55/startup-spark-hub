import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone, Video, MoreVertical } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatHeaderProps {
  contact: {
    name: string;
    role: string;
    avatar: string;
  } | undefined;
  onStartVideoCall: () => void;
}

const ChatHeader = ({ contact, onStartVideoCall }: ChatHeaderProps) => {
  if (!contact) return null;

  return (
    <div className="p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border-2 border-background">
          <img src={contact.avatar} alt={contact.name} className="object-cover" />
        </Avatar>
        <div>
          <h3 className="text-sm font-medium">{contact.name}</h3>
          <p className="text-xs text-muted-foreground">{contact.role}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => toast.info("Audio calls coming soon!")}
          className="text-muted-foreground hover:text-foreground"
        >
          <Phone className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onStartVideoCall}
          className="text-muted-foreground hover:text-foreground"
        >
          <Video className="w-4 h-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Clear Chat</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Block Contact
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ChatHeader;