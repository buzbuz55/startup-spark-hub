import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Calendar, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const StartupOpportunities = () => {
  const [startups, setStartups] = useState([]);
  const [sortBy, setSortBy] = useState("recent"); // "recent" or "popular"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStartups();
  }, [sortBy]);

  const fetchStartups = async () => {
    try {
      let query = supabase
        .from('startup_ideas')
        .select(`
          *,
          startup_votes (
            vote_type
          )
        `);

      if (sortBy === "recent") {
        query = query.order('created_at', { ascending: false });
      } else {
        // For popular sorting, we'll need to count votes
        query = query.order('created_at', { ascending: false }); // Temporary fallback
      }

      const { data, error } = await query;
      
      if (error) throw error;
      
      // Calculate vote counts
      const startupsWithVotes = data.map(startup => ({
        ...startup,
        voteCount: startup.startup_votes?.reduce((acc, vote) => 
          acc + (vote.vote_type === 'up' ? 1 : -1), 0) || 0
      }));

      // Sort by votes if needed
      if (sortBy === "popular") {
        startupsWithVotes.sort((a, b) => b.voteCount - a.voteCount);
      }

      setStartups(startupsWithVotes);
    } catch (error) {
      console.error('Error fetching startups:', error);
      toast.error("Failed to load startup opportunities");
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (startupId, voteType) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to vote");
        return;
      }

      const { data: existingVote } = await supabase
        .from('startup_votes')
        .select()
        .eq('startup_id', startupId)
        .eq('user_id', user.id)
        .single();

      if (existingVote) {
        if (existingVote.vote_type === voteType) {
          // Remove vote if clicking the same button
          await supabase
            .from('startup_votes')
            .delete()
            .eq('startup_id', startupId)
            .eq('user_id', user.id);
        } else {
          // Update vote if changing vote type
          await supabase
            .from('startup_votes')
            .update({ vote_type: voteType })
            .eq('startup_id', startupId)
            .eq('user_id', user.id);
        }
      } else {
        // Insert new vote
        await supabase
          .from('startup_votes')
          .insert({
            startup_id: startupId,
            user_id: user.id,
            vote_type: voteType
          });
      }

      fetchStartups(); // Refresh the list
      toast.success("Vote recorded successfully");
    } catch (error) {
      console.error('Error voting:', error);
      toast.error("Failed to record vote");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Startup Opportunities</h1>
          <div className="flex gap-4">
            <Button
              variant={sortBy === "recent" ? "default" : "outline"}
              onClick={() => setSortBy("recent")}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Recent
            </Button>
            <Button
              variant={sortBy === "popular" ? "default" : "outline"}
              onClick={() => setSortBy("popular")}
            >
              <Star className="w-4 h-4 mr-2" />
              Popular
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {startups.map((startup) => (
            <Card key={startup.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{startup.title}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(startup.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(startup.id, 'up')}
                    >
                      <ThumbsUp className="w-4 h-4" />
                    </Button>
                    <span className="font-semibold">{startup.voteCount}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(startup.id, 'down')}
                    >
                      <ThumbsDown className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{startup.description}</p>
                <div className="mt-4">
                  <p className="text-sm font-semibold">Market:</p>
                  <p className="text-sm text-gray-600">{startup.market}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-semibold">Team:</p>
                  <p className="text-sm text-gray-600">{startup.team}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default StartupOpportunities;