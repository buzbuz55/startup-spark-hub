import { cn } from "@/lib/utils";
import MessageContent from "./MessageContent";

interface MessageProps {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  poll?: any;
  onEdit?: (id: string, newText: string) => void;
  replyTo?: {
    id: string;
    text: string;
    senderName: string;
  };
}

const Message = ({
  id,
  senderId,
  text,
  timestamp,
  status,
  poll,
  onEdit,
  replyTo
}: MessageProps) => {
  return (
    <div
      className={`flex ${
        senderId === "current-user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={cn(
          "max-w-[70%] rounded-lg p-3 relative group",
          senderId === "current-user"
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}
      >
        <MessageContent
          id={id}
          text={text}
          timestamp={timestamp}
          status={status}
          senderId={senderId}
          poll={poll}
          onEdit={onEdit}
          replyTo={replyTo}
        />
      </div>
    </div>
  );
};

export default Message;