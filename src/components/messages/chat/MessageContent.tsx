import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, Check, X } from "lucide-react";
import { toast } from "sonner";
import MessageStatus from "./MessageStatus";

interface MessageContentProps {
  id: string;
  text: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  senderId: string;
  onEdit?: (id: string, newText: string) => void;
}

const MessageContent = ({
  id,
  text,
  timestamp,
  status,
  senderId,
  onEdit,
}: MessageContentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleSaveEdit = async () => {
    if (!editedText.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    if (onEdit) {
      onEdit(id, editedText);
      setIsEditing(false);
    }
  };

  return (
    <div className="space-y-1">
      {isEditing ? (
        <div className="flex gap-2">
          <Input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="bg-background"
          />
          <Button size="icon" onClick={handleSaveEdit}>
            <Check className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => setIsEditing(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <p className="text-sm whitespace-pre-wrap break-words">{text}</p>
          <div className="flex items-center justify-end gap-1 mt-1">
            <span className="text-xs opacity-60">{timestamp}</span>
            {senderId === "current-user" && (
              <>
                <MessageStatus status={status || 'sent'} />
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MessageContent;