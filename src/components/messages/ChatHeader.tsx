import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone, Video, MoreVertical, X, Mail, Smartphone } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GroupChatHeader from "./GroupChatHeader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ChatHeaderProps {
  contact?: {
    name: string;
    role: string;
    avatar: string;
  };
  group?: {
    id: string;
    name: string;
    description?: string;
    avatar?: string;
    members: Array<{
      id: string;
      name: string;
      avatar: string;
      role: string;
      isAdmin: boolean;
    }>;
  };
  onStartVideoCall: () => void;
  onLeaveGroup?: () => void;
  onAddMember?: () => void;
  onClose?: () => void;
}

const ChatHeader = ({ 
  contact, 
  group, 
  onStartVideoCall, 
  onLeaveGroup, 
  onAddMember,
  onClose 
}: ChatHeaderProps) => {
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitePhone, setInvitePhone] = useState("");

  const handleInvite = async () => {
    try {
      if (inviteEmail) {
        // Send email invitation
        toast.success(`Invitation sent to ${inviteEmail}`);
      } else if (invitePhone) {
        // Send SMS invitation
        toast.success(`Invitation sent to ${invitePhone}`);
      }
      setShowInviteDialog(false);
      setInviteEmail("");
      setInvitePhone("");
    } catch (error) {
      toast.error("Failed to send invitation");
    }
  };

  if (group) {
    return (
      <GroupChatHeader
        group={group}
        onStartVideoCall={onStartVideoCall}
        onLeaveGroup={onLeaveGroup!}
        onAddMember={onAddMember!}
      />
    );
  }

  if (!contact) return null;

  return (
    <div className="p-4 border-b flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
        <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Invite to Chat</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  placeholder="friend@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input
                  placeholder="+1 (555) 000-0000"
                  value={invitePhone}
                  onChange={(e) => setInvitePhone(e.target.value)}
                />
              </div>
              <Button onClick={handleInvite} className="w-full">
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground ml-2"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;