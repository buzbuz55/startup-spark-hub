import { useState, useEffect } from "react";
import Header from "@/components/Header";
import StartupSubmissionForm from "@/components/startup/StartupSubmissionForm";
import StartupPost from "@/components/startup/StartupPost";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const StartupOpportunities = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStartups = async () => {
    try {
      let { data, error } = await supabase
        .from('startup_ideas')
        .select(`
          *,
          startup_votes (
            vote_type,
            user_id
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const { data: { user } } = await supabase.auth.getUser();
      
      const startupsWithVotes = data.map(startup => ({
        ...startup,
        voteCount: startup.startup_votes?.reduce((acc, vote) => 
          acc + (vote.vote_type === 'up' ? 1 : -1), 0) || 0,
        userVote: startup.startup_votes?.find(vote => vote.user_id === user?.id)?.vote_type
      }));

      setStartups(startupsWithVotes);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to load startup opportunities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStartups();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <StartupSubmissionForm onSubmit={fetchStartups} />
        <div className="mt-8">
          {startups.map((startup) => (
            <StartupPost
              key={startup.id}
              id={startup.id}
              title={startup.title}
              description={startup.description}
              voteCount={startup.voteCount}
              userVote={startup.userVote}
              onVoteChange={fetchStartups}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default StartupOpportunities;