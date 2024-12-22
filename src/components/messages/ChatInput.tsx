import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Smile } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useState } from "react";
import MessageActions from "./MessageActions";
import { toast } from "sonner";

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: () => void;
  isTyping?: boolean;
}

const ChatInput = ({ message, setMessage, onSendMessage, isTyping }: ChatInputProps) => {
  const [showEmojis, setShowEmojis] = useState(false);
  const [showPollForm, setShowPollForm] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);

  const handleEmojiSelect = (emoji: any) => {
    setMessage(message + emoji.native);
    setShowEmojis(false);
  };

  const handleAddOption = () => {
    setPollOptions([...pollOptions, ""]);
  };

  const handleRemoveOption = (index: number) => {
    setPollOptions(pollOptions.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const handleCreatePoll = async () => {
    if (!pollQuestion.trim()) {
      toast.error("Please enter a question");
      return;
    }

    const validOptions = pollOptions.filter(opt => opt.trim());
    if (validOptions.length < 2) {
      toast.error("Please add at least 2 options");
      return;
    }

    setMessage(`/poll ${pollQuestion}\n${validOptions.join("\n")}`);
    setShowPollForm(false);
    setPollQuestion("");
    setPollOptions(["", ""]);
    onSendMessage();
  };

  const handleActionSelect = (action: string, data?: any) => {
    switch (action) {
      case "polls":
        setShowPollForm(true);
        break;
      case "camera":
        if (data instanceof MediaStream) {
          // Handle camera stream
          // You might want to create a video preview component
          toast.success("Camera accessed successfully!");
        }
        break;
      case "files":
        if (data instanceof File) {
          // Handle file upload
          toast.success(`File selected: ${data.name}`);
        }
        break;
      case "location":
        if (data?.latitude && data?.longitude) {
          const locationMessage = `📍 Location: ${data.latitude}, ${data.longitude}`;
          setMessage(locationMessage);
        }
        break;
      case "polls":
        setMessage("/poll Question\nOption 1\nOption 2\nOption 3");
        break;
      case "contracts":
        setMessage("/contract\nTitle: \nTerms: \nDeadline: ");
        break;
      case "event":
        setMessage("/event\nTitle: \nDate: \nLocation: \nDescription: ");
        break;
      case "contact":
        setMessage("/contact\nName: \nPhone: \nEmail: ");
        break;
      case "ai-image":
        setMessage("/imagine A detailed description of the image you want to generate");
        break;
      case "edit":
        // This will be handled by the message list component
        toast.info("Select a message to edit");
        break;
      default:
        toast.info(`${action} feature coming soon!`);
    }
  };

  return (
    <div className="p-4 border-t">
      {isTyping && (
        <div className="text-xs text-muted-foreground mb-2">
          Contact is typing...
        </div>
      )}
      {showPollForm ? (
        <div className="space-y-4">
          <Input
            value={pollQuestion}
            onChange={(e) => setPollQuestion(e.target.value)}
            placeholder="Enter your question..."
          />
          <div className="space-y-2">
            {pollOptions.map((option, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                />
                {pollOptions.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveOption(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={handleAddOption}>
              Add Option
            </Button>
            <Button type="button" onClick={handleCreatePoll}>
              Create Poll
            </Button>
            <Button type="button" variant="ghost" onClick={() => setShowPollForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSendMessage();
          }}
          className="flex gap-2 items-end"
        >
          <MessageActions onActionSelect={handleActionSelect} />
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
      )}
    </div>
  );
};

export default ChatInput;
