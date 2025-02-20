import { ScrollArea } from "@/components/ui/scroll-area";
import Message from "./Message";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Smile } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import type { Message as MessageType } from "@/types/messages";

export interface MessageListProps {
  messages: MessageType[];
  onEmojiSelect?: (emoji: any) => void;
  onEditMessage?: (id: string, newText: string) => void;
  onlineUsers?: string[];
}

const MessageList = ({ messages, onEmojiSelect, onEditMessage, onlineUsers }: MessageListProps) => {
  const [showEmojis, setShowEmojis] = useState(false);

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