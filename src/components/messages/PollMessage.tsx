import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Check, ListCheck, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface PollMessageProps {
  pollId: string;
  question: string;
  options: string[];
  votes: { option_index: number; count: number }[];
  userVote?: number;
  onVote: (optionIndex: number) => void;
  totalVoters?: number;
}

const PollMessage = ({ 
  pollId, 
  question, 
  options, 
  votes, 
  userVote, 
  onVote,
  totalVoters = 0
}: PollMessageProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleVote = async (optionIndex: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to vote");
        return;
      }

      const { error } = await supabase
        .from('poll_votes')
        .insert({
          poll_id: pollId,
          option_index: optionIndex,
          user_id: user.id
        });

      if (error) throw error;
      onVote(optionIndex);
      toast.success("Vote recorded successfully!");
    } catch (error) {
      console.error("Error voting:", error);
      toast.error("Failed to record vote");
    }
  };

  const totalVotes = votes.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="bg-muted/50 p-4 rounded-lg space-y-4">
      <div className="flex items-start gap-3">
        <ListCheck className="h-5 w-5 mt-1 text-primary" />
        <div className="flex-1 space-y-1">
          <h3 className="font-medium text-base">{question}</h3>
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <Users className="h-3 w-3" />
            {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {options.map((option, index) => {
          const voteCount = votes.find(v => v.option_index === index)?.count || 0;
          const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;
          const isSelected = userVote === index;

          return (
            <div key={index} className="space-y-1">
              <Button
                variant={isSelected ? "default" : "outline"}
                className={cn(
                  "w-full justify-between group relative overflow-hidden",
                  isSelected && "bg-primary text-primary-foreground"
                )}
                onClick={() => handleVote(index)}
                disabled={userVote !== undefined}
              >
                <span className="flex items-center gap-2 z-10 relative">
                  {isSelected && <Check className="h-4 w-4" />}
                  {option}
                </span>
                <span className={cn(
                  "text-sm z-10 relative",
                  isSelected ? "text-primary-foreground" : "text-muted-foreground"
                )}>
                  {percentage.toFixed(0)}%
                </span>
                <div 
                  className={cn(
                    "absolute left-0 top-0 h-full bg-primary/10",
                    isSelected && "bg-primary/20"
                  )}
                  style={{ width: `${percentage}%` }}
                />
              </Button>
              {isExpanded && voteCount > 0 && (
                <p className="text-xs text-muted-foreground pl-2">
                  {voteCount} {voteCount === 1 ? 'person' : 'people'} voted for this option
                </p>
              )}
            </div>
          );
        })}
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="text-xs"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show less" : "Show details"}
      </Button>
    </div>
  );
};

export default PollMessage;