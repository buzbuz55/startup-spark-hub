
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import StartupSubmissionForm from "@/components/startup/StartupSubmissionForm";
import StartupPost from "@/components/startup/StartupPost";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Brain, VideoIcon, BookText, GraduationCap, Sparkles } from "lucide-react";

const StartupOpportunities = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStartups = async () => {
    try {
      // First, add our sample startup ideas if they don't exist
      const sampleStartups = [
        {
          title: "PIAS AI Solutions - AI-Powered Process Automation",
          description: "Building an intelligent process automation platform that uses AI to streamline business operations. Looking for developers with experience in Python, machine learning, and process automation.",
          market: "Enterprise Software",
          team: "Currently 3 members, seeking ML engineers and frontend developers",
          email: "team@piasai.com"
        },
        {
          title: "Ai15.com - Rapid AI Model Development",
          description: "Creating a platform that allows developers to train and deploy AI models in 15 minutes or less. Seeking innovative developers who want to revolutionize AI development workflows.",
          market: "Developer Tools",
          team: "4 founding members, looking for backend developers and DevOps engineers",
          email: "join@ai15.com"
        },
        {
          title: "AIVIDEO - Intelligent Video Processing Platform",
          description: "Developing an AI-powered video processing platform that can automatically edit, caption, and optimize video content. Looking for video processing experts and ML engineers.",
          market: "Media Technology",
          team: "2 founders, seeking video processing specialists and AI researchers",
          email: "opportunities@aivideo.ai"
        },
        {
          title: "CONTENTAI - AI Content Generation Suite",
          description: "Building a comprehensive AI content generation platform for marketing teams. Generate blog posts, social media content, and marketing copy with advanced AI models.",
          market: "Marketing Technology",
          team: "5 team members, looking for NLP specialists and full-stack developers",
          email: "careers@contentai.tech"
        },
        {
          title: "EDUAI - Personalized Learning Assistant",
          description: "Creating an AI-powered education platform that adapts to each student's learning style and pace. Seeking passionate educators and AI developers to revolutionize education.",
          market: "Education Technology",
          team: "3 founders with education background, need ML engineers and UX designers",
          email: "join@eduai.education"
        },
        {
          title: "SmartContract AI - Automated Legal Document Analysis",
          description: "Developing an AI system for analyzing and generating legal documents. Looking for developers with experience in NLP and legal tech.",
          market: "Legal Technology",
          team: "4 members including legal experts, seeking NLP developers",
          email: "team@smartcontractai.legal"
        },
        {
          title: "AI Healthcare Assistant",
          description: "Building an AI-powered healthcare assistant for medical professionals. Help streamline patient care and medical documentation.",
          market: "Healthcare Technology",
          team: "3 healthcare professionals, looking for ML engineers and backend developers",
          email: "join@aihealthcare.med"
        },
        {
          title: "Sustainable AI - Green Energy Optimization",
          description: "Creating AI solutions for optimizing renewable energy systems and reducing carbon footprint. Join us in fighting climate change with AI.",
          market: "Clean Technology",
          team: "5 team members, seeking ML engineers and energy specialists",
          email: "careers@sustainableai.green"
        }
      ];

      let { data: existingStartups, error: fetchError } = await supabase
        .from('startup_ideas')
        .select(`
          *,
          startup_votes (
            vote_type,
            user_id
          )
        `)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      const { data: { user } } = await supabase.auth.getUser();
      
      const processedStartups = existingStartups.map(startup => ({
        ...startup,
        voteCount: startup.startup_votes?.reduce((acc, vote) => 
          acc + (vote.vote_type === 'up' ? 1 : -1), 0) || 0,
        userVote: startup.startup_votes?.find(vote => vote.user_id === user?.id)?.vote_type
      }));

      setStartups(processedStartups);
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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-700 rounded-lg" />
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Startup Opportunities
              </span>
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Join innovative AI startups and help build the future of technology
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center bg-gray-800 rounded-full px-4 py-2">
                <Brain className="w-5 h-5 text-purple-400 mr-2" />
                <span>AI/ML</span>
              </div>
              <div className="flex items-center bg-gray-800 rounded-full px-4 py-2">
                <VideoIcon className="w-5 h-5 text-blue-400 mr-2" />
                <span>Video Tech</span>
              </div>
              <div className="flex items-center bg-gray-800 rounded-full px-4 py-2">
                <BookText className="w-5 h-5 text-green-400 mr-2" />
                <span>Content</span>
              </div>
              <div className="flex items-center bg-gray-800 rounded-full px-4 py-2">
                <GraduationCap className="w-5 h-5 text-yellow-400 mr-2" />
                <span>Education</span>
              </div>
              <div className="flex items-center bg-gray-800 rounded-full px-4 py-2">
                <Sparkles className="w-5 h-5 text-pink-400 mr-2" />
                <span>Innovation</span>
              </div>
            </div>
          </div>

          <StartupSubmissionForm onSubmit={fetchStartups} />
          
          <div className="mt-8 space-y-6">
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
        </div>
      </main>
    </div>
  );
};

export default StartupOpportunities;
