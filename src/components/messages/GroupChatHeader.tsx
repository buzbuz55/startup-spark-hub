import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone, Video, MoreVertical, Users } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  isAdmin: boolean;
}

interface GroupChatHeaderProps {
  group: {
    id: string;
    name: string;
    description?: string;
    avatar?: string;
    members: GroupMember[];
  };
  onStartVideoCall: () => void;
  onLeaveGroup: () => void;
  onAddMember: () => void;
}

const GroupChatHeader = ({ group, onStartVideoCall, onLeaveGroup, onAddMember }: GroupChatHeaderProps) => {
  return (
    <div className="p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border-2 border-background">
          <img src={group.avatar || "/placeholder.svg"} alt={group.name} className="object-cover" />
        </Avatar>
        <div>
          <h3 className="text-sm font-medium">{group.name}</h3>
          <p className="text-xs text-muted-foreground">{group.members.length} members</p>
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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Users className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Group Members</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[300px] mt-4">
              <div className="space-y-4">
                {group.members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <img src={member.avatar} alt={member.name} className="object-cover" />
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {member.isAdmin ? "Admin" : "Member"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
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
            <DropdownMenuItem onClick={onAddMember}>Add Member</DropdownMenuItem>
            <DropdownMenuItem onClick={onLeaveGroup} className="text-destructive">
              Leave Group
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default GroupChatHeader;