import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import CommentForm from "./comments/CommentForm";
import CommentItem from "./comments/CommentItem";
import { Comment } from "./comments/types";

interface ProjectCommentsProps {
  projectId: string;
}

const ProjectComments = ({ projectId }: ProjectCommentsProps) => {
  const { data: comments, refetch } = useQuery({
    queryKey: ['project-comments', projectId],
    queryFn: async () => {
      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(projectId)) {
        console.error("Invalid UUID format for projectId:", projectId);
        return [];
      }

      const { data, error } = await supabase
        .from('comments')
        .select(`
          id,
          content,
          created_at,
          file_url,
          file_type,
          profiles!comments_user_id_fkey (
            full_name,
            avatar_url
          )
        `)
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching comments:", error);
        return [];
      }

      // Transform the data to match our Comment type
      const transformedData = data.map(comment => ({
        ...comment,
        user: comment.profiles || {
          full_name: 'Anonymous',
          avatar_url: null
        }
      }));

      return transformedData as Comment[];
    },
  });

  return (
    <div className="space-y-4">
      <CommentForm projectId={projectId} onCommentAdded={refetch} />
      <div className="space-y-4">
        {comments?.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default ProjectComments;