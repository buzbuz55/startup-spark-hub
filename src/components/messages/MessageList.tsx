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

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
}

interface MessageListProps {
  messages: Message[];
  onEmojiSelect?: (emoji: any) => void;
  onEditMessage?: (id: string, newText: string) => void;
}

const MessageList = ({ messages, onEmojiSelect, onEditMessage }: MessageListProps) => {
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
      <Popover open={showEmojis} onOpenChange={setShowEmojis}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-4 right-4"
          >
            <Smile className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="end">
          <Picker
            data={data}
            onEmojiSelect={(emoji: any) => {
              if (onEmojiSelect) {
                onEmojiSelect(emoji);
                setShowEmojis(false);
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </ScrollArea>
  );
};

export default MessageList;