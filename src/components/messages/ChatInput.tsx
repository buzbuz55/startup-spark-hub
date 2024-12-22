import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Paperclip, Smile } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useState } from "react";

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: () => void;
  isTyping?: boolean;
}

const ChatInput = ({ message, setMessage, onSendMessage, isTyping }: ChatInputProps) => {
  const [showEmojis, setShowEmojis] = useState(false);

  const handleEmojiSelect = (emoji: any) => {
    setMessage(message + emoji.native);
    setShowEmojis(false);
  };

  return (
    <div className="p-4 border-t">
      {isTyping && (
        <div className="text-xs text-muted-foreground mb-2">
          Contact is typing...
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSendMessage();
        }}
        className="flex gap-2 items-end"
      >
        <Popover open={showEmojis} onOpenChange={setShowEmojis}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-10 w-10"
            >
              <Smile className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start" side="top">
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
            />
          </PopoverContent>
        </Popover>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-10 w-10"
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="bg-background"
        />
        <Button type="submit" size="icon" className="h-10 w-10">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;