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
            vote_type,
            user_id
          )
        `);

      if (sortBy === "recent") {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;
      
      if (error) throw error;

      const { data: { user } } = await supabase.auth.getUser();
      
      // Calculate vote counts
      const startupsWithVotes = data.map(startup => ({
        ...startup,
        voteCount: startup.startup_votes?.reduce((acc, vote) => 
          acc + (vote.vote_type === 'up' ? 1 : -1), 0) || 0,
        userVote: startup.startup_votes?.find(vote => vote.user_id === user?.id)?.vote_type
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
          toast.success("Vote removed");
        } else {
          // Update vote if changing vote type
          await supabase
            .from('startup_votes')
            .update({ vote_type: voteType })
            .eq('startup_id', startupId)
            .eq('user_id', user.id);
          toast.success("Vote updated");
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
        toast.success("Vote recorded");
      }

      fetchStartups(); // Refresh the list
    } catch (error) {
      console.error('Error voting:', error);
      toast.error("Failed to record vote");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-24">
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
                      variant={startup.userVote === 'up' ? "default" : "ghost"}
                      size="sm"
                      onClick={() => handleVote(startup.id, 'up')}
                      className="relative"
                    >
                      <ThumbsUp className="w-4 h-4" />
                    </Button>
                    <span className="font-semibold">{startup.voteCount}</span>
                    <Button
                      variant={startup.userVote === 'down' ? "default" : "ghost"}
                      size="sm"
                      onClick={() => handleVote(startup.id, 'down')}
                      className="relative"
                    >
                      <ThumbsDown className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{startup.description}</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-semibold">Market:</p>
                    <p className="text-sm text-gray-600">{startup.market}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Team:</p>
                    <p className="text-sm text-gray-600">{startup.team}</p>
                  </div>
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