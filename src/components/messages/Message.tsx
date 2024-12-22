import { cn } from "@/lib/utils";
import { Check, CheckCheck, Edit2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface MessageProps {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  onEdit?: (id: string, newText: string) => void;
}

const Message = ({ id, senderId, text, timestamp, status, onEdit }: MessageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

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

  const handleSaveEdit = async () => {
    if (!editedText.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    try {
      const { error } = await supabase
        .from('messages')
        .update({ content: editedText })
        .eq('id', id);

      if (error) throw error;

      if (onEdit) {
        onEdit(id, editedText);
      }
      setIsEditing(false);
      toast.success("Message updated successfully");
    } catch (error) {
      console.error("Error updating message:", error);
      toast.error("Failed to update message");
    }
  };

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
                  {getStatusIcon(status)}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Message;