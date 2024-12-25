import { ScrollArea } from "@/components/ui/scroll-area";
import Message from "./Message";
import type { Message as MessageType } from "@/types/messages";

export interface MessageListProps {
  messages: MessageType[];
  onEditMessage?: (id: string, newText: string) => void;
  onlineUsers?: string[]; // Add this prop definition
}

const MessageList = ({ messages, onEditMessage, onlineUsers }: MessageListProps) => {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((msg) => (
          <Message
            key={msg.id}
            {...msg}
            onEdit={onEditMessage}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default MessageList;