import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Check, ListCheck } from "lucide-react";

interface PollMessageProps {
  pollId: string;
  question: string;
  options: string[];
  votes: { option_index: number; count: number }[];
  userVote?: number;
  onVote: (optionIndex: number) => void;
}

const PollMessage = ({ pollId, question, options, votes, userVote, onVote }: PollMessageProps) => {
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

  return (
    <div className="bg-muted p-4 rounded-lg space-y-4">
      <div className="flex items-center gap-2">
        <ListCheck className="h-5 w-5" />
        <h3 className="font-medium">{question}</h3>
      </div>
      <div className="space-y-2">
        {options.map((option, index) => {
          const voteCount = votes.find(v => v.option_index === index)?.count || 0;
          const totalVotes = votes.reduce((acc, curr) => acc + curr.count, 0);
          const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;

          return (
            <Button
              key={index}
              variant={userVote === index ? "default" : "outline"}
              className="w-full justify-between"
              onClick={() => handleVote(index)}
              disabled={userVote !== undefined}
            >
              <span className="flex items-center gap-2">
                {userVote === index && <Check className="h-4 w-4" />}
                {option}
              </span>
              <span className="text-sm text-muted-foreground">
                {percentage.toFixed(0)}% ({voteCount})
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default PollMessage;