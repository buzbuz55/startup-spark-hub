import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Check, CheckCheck } from "lucide-react";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Smile } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  encrypted_content?: string;
}

interface MessageListProps {
  messages: Message[];
  onEmojiSelect?: (emoji: any) => void;
}

const MessageList = ({ messages, onEmojiSelect }: MessageListProps) => {
  const [showEmojis, setShowEmojis] = useState(false);

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'sent':
        return <Check className="h-3 w-3 text-muted-foreground" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default:
        return null;
    }
  };

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
                "max-w-[70%] rounded-lg p-3 relative group",
                msg.senderId === "current-user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-xs opacity-60">{msg.timestamp}</span>
                {msg.senderId === "current-user" && getStatusIcon(msg.status)}
              </div>
            </div>
          </div>
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