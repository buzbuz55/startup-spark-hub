import { Avatar } from "@/components/ui/avatar";
import { Comment } from "./types";

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className="flex gap-4 p-4 border rounded-lg">
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
  );
};

export default CommentItem;