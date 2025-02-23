
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface StartupPostProps {
  id: string;
  title: string;
  description: string;
  voteCount: number;
  userVote?: 'up' | 'down';
  onVoteChange: () => void;
}

const StartupPost = ({
  id,
  title,
  description,
  voteCount,
  userVote,
  onVoteChange,
}: StartupPostProps) => {
  const handleVote = async (voteType: 'up' | 'down') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to vote");
        return;
      }

      if (userVote === voteType) {
        // Remove vote if clicking the same button
        await supabase
          .from('startup_votes')
          .delete()
          .eq('startup_id', id)
          .eq('user_id', user.id);
        toast.success("Vote removed");
      } else {
        if (userVote) {
          // Update existing vote
          await supabase
            .from('startup_votes')
            .update({ vote_type: voteType })
            .eq('startup_id', id)
            .eq('user_id', user.id);
          toast.success("Vote updated");
        } else {
          // Insert new vote
          await supabase
            .from('startup_votes')
            .insert({
              startup_id: id,
              user_id: user.id,
              vote_type: voteType
            });
          toast.success("Vote recorded");
        }
      }
      onVoteChange();
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to record vote");
    }
  };

  const handleConnect = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to connect");
        return;
      }

      // For now, just show a success message
      toast.success("Connection request sent!");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to connect");
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="flex items-center gap-2">
            <Button
              variant={userVote === 'up' ? "default" : "ghost"}
              size="sm"
              onClick={() => handleVote('up')}
            >
              <ThumbsUp className="w-4 h-4" />
            </Button>
            <span className="font-semibold">{voteCount}</span>
            <Button
              variant={userVote === 'down' ? "default" : "ghost"}
              size="sm"
              onClick={() => handleVote('down')}
            >
              <ThumbsDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        <Button variant="outline" onClick={handleConnect}>
          <MessageSquare className="w-4 h-4 mr-2" />
          Connect
        </Button>
      </CardContent>
    </Card>
  );
};

export default StartupPost;
