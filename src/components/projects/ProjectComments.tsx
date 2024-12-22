import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Paperclip, Send, X } from "lucide-react";
import { toast } from "sonner";

interface ProjectCommentsProps {
  projectId: string;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  file_url?: string;
  file_type?: string;
  user: {
    full_name: string;
    avatar_url: string;
  };
}

const ProjectComments = ({ projectId }: ProjectCommentsProps) => {
  const [comment, setComment] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { data: comments, refetch } = useQuery({
    queryKey: ['project-comments', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          id,
          content,
          created_at,
          file_url,
          file_type,
          profiles:user_id (
            full_name,
            avatar_url
          )
        `)
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Comment[];
    },
  });

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
      const {
        data: { user },
      } = await supabase.auth.getUser();

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

        if (uploadError) {
          throw uploadError;
        }

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
      refetch();
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to add comment");
    }
  };

  return (
    <div className="space-y-4">
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

      <div className="space-y-4">
        {comments?.map((comment) => (
          <div key={comment.id} className="flex gap-4 p-4 border rounded-lg">
            <Avatar className="h-10 w-10">
              <img src={comment.user.avatar_url || "/placeholder.svg"} alt="" />
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{comment.user.full_name || "Anonymous"}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="mt-2">{comment.content}</p>
              {comment.file_url && (
                <div className="mt-2">
                  {comment.file_type?.startsWith('image/') ? (
                    <img
                      src={comment.file_url}
                      alt="Attachment"
                      className="max-w-xs rounded-lg"
                    />
                  ) : (
                    <a
                      href={comment.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      View attachment
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectComments;