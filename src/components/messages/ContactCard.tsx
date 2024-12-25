import { Contact } from "@/types/contacts";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ContactCardProps {
  contact: Contact;
  isSelected: boolean;
  onClick: () => void;
}

const ContactCard = ({ contact, isSelected, onClick }: ContactCardProps) => {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors",
        isSelected ? "bg-primary/10" : "hover:bg-muted"
      )}
      onClick={onClick}
    >
      <Avatar className="h-10 w-10 border-2 border-background">
        <AvatarImage src={contact.avatar} alt={contact.name} />
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium text-sm">{contact.name}</p>
            <p className="text-xs text-muted-foreground">
              {contact.role}
            </p>
          </div>
          {contact.timestamp && (
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {contact.timestamp}
            </span>
          )}
        </div>
        {contact.lastMessage && (
          <p className="text-xs text-muted-foreground truncate mt-1">
            {contact.lastMessage}
          </p>
        )}
      </div>
      {contact.unread && contact.unread > 0 && (
        <div className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {contact.unread}
        </div>
      )}
    </div>
  );
};

export default ContactCard;