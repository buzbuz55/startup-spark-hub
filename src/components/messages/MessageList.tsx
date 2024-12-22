import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
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
              className={cn(
                "max-w-[70%] rounded-lg p-3",
                msg.senderId === "current-user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
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
  );
};

export default MessageList;