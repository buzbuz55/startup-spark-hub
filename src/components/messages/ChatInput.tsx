import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Send, 
  Paperclip, 
  Image, 
  FileText, 
  BarChart2, 
  Calendar,
  Smile
} from "lucide-react";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

export interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: () => void;
  isTyping?: boolean;
  onTyping?: () => void;
}

const ChatInput = ({
  message,
  setMessage,
  onSendMessage,
  isTyping,
  onTyping
}: ChatInputProps) => {
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTyping = () => {
    if (onTyping) {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      onTyping();
      const timeout = setTimeout(() => {
        setTypingTimeout(null);
      }, 1000);
      setTypingTimeout(timeout);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log("File selected:", file);
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setMessage(message + emoji.native);
    setShowEmoji(false);
  };

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <div className="p-4 border-t">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleFileUpload}
            className="text-muted-foreground hover:text-foreground"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Image className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <BarChart2 className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Calendar className="h-5 w-5" />
          </Button>
          <div className="flex-1" />
          <Popover open={showEmoji} onOpenChange={setShowEmoji}>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-muted-foreground hover:text-foreground"
              >
                <Smile className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="end">
              <Picker
                data={data}
                onEmojiSelect={handleEmojiSelect}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex gap-2">
          <Textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleTyping();
            }}
            placeholder="Type a message..."
            className="min-h-[80px] resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSendMessage();
              }
            }}
          />
          <Button 
            onClick={onSendMessage}
            className="self-end"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;