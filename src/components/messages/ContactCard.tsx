import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ContactCardProps {
  id: string;
  name: string;
  role?: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  online: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

const ContactCard = ({
  name,
  role,
  avatar,
  lastMessage,
  timestamp,
  unreadCount,
  online,
  isSelected,
  onClick,
}: ContactCardProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/50 rounded-lg transition-colors",
        isSelected && "bg-muted"
      )}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        {online && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold truncate">{name}</h3>
            {role && <p className="text-xs text-muted-foreground">{role}</p>}
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
            {timestamp}
          </span>
        </div>
        <p className="text-sm text-muted-foreground truncate">{lastMessage}</p>
      </div>
      {unreadCount > 0 && (
        <Badge variant="default" className="rounded-full">
          {unreadCount}
        </Badge>
      )}
    </div>
  );
};

export default ContactCard;