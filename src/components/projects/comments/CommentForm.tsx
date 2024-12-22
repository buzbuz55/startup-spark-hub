import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Send, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface CommentFormProps {
  projectId: string;
  onCommentAdded: () => void;
}

const CommentForm = ({ projectId, onCommentAdded }: CommentFormProps) => {
  const [comment, setComment] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,.pdf,.doc,.docx';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          toast.error("File size must be less than 5MB");
          return;
        }
        setFile(file);
      }
    };
    input.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Please sign in to comment");
        return;
      }

      let fileUrl = null;
      let fileType = null;

      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError, data } = await supabase.storage
          .from('comment_attachments')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('comment_attachments')
          .getPublicUrl(fileName);

        fileUrl = publicUrl;
        fileType = file.type;
      }

      const { error } = await supabase
        .from('comments')
        .insert({
          project_id: projectId,
          user_id: user.id,
          content: comment,
          file_url: fileUrl,
          file_type: fileType,
        });

      if (error) throw error;

      setComment("");
      setFile(null);
      onCommentAdded();
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to add comment");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1"
        />
        <Button type="button" variant="outline" onClick={handleFileSelect}>
          <Paperclip className="h-4 w-4" />
        </Button>
        <Button type="submit" disabled={!comment.trim() && !file}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
      {file && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{file.name}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setFile(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </form>
  );
};

export default CommentForm;