import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Rocket, Sparkles, Target, Users, Brain, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const SubmitIdea = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    market: "",
    team: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        toast.error("Please sign in to submit your idea");
        navigate("/login");
        return;
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error checking auth status:", error);
      navigate("/login");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();

      if (userError || !user) {
        toast.error("Please sign in to submit your idea");
        navigate("/login");
        return;
      }

      const { error: messageError } = await supabase
        .from('messages')
        .insert([
          {
            sender_id: user.id,
            receiver_id: user.id, // For idea submissions, sender and receiver are the same
            content: JSON.stringify({
              type: 'startup_idea',
              ...formData,
              timestamp: new Date().toISOString()
            })
          }
        ]);

      if (messageError) {
        console.error('Error submitting idea:', messageError);
        toast.error("Failed to submit idea. Please try again.");
        return;
      }

      toast.success("Your idea has been submitted! 🚀");
      setFormData({
        title: "",
        description: "",
        market: "",
        team: "",
        email: "",
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error("An error occurred while submitting your idea");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700">
        <Header />
        <div className="container mx-auto px-4 pt-24 text-center text-white">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Launch Your Next Big Thing 🚀
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands of young entrepreneurs who turned their ideas into reality!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <StatsCard icon={Rocket} title="500+" description="Startups Launched" />
            <StatsCard icon={Users} title="10k+" description="Active Founders" />
            <StatsCard icon={Trophy} title="$2M+" description="Funding Raised" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-white text-lg font-medium">What's your big idea? 💡</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Uber for Pet Walking"
                  className="bg-white/20 border-white/10 text-white placeholder:text-white/60"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-white text-lg font-medium">Tell us more about it ✨</label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="What problem does it solve? How does it work?"
                  className="bg-white/20 border-white/10 text-white placeholder:text-white/60 min-h-[120px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-white text-lg font-medium">Target Market 🎯</label>
                <Input
                  name="market"
                  value={formData.market}
                  onChange={handleChange}
                  placeholder="Who are your potential customers?"
                  className="bg-white/20 border-white/10 text-white placeholder:text-white/60"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-white text-lg font-medium">Team Background 👥</label>
                <Input
                  name="team"
                  value={formData.team}
                  onChange={handleChange}
                  placeholder="Tell us about your team's skills"
                  className="bg-white/20 border-white/10 text-white placeholder:text-white/60"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-white text-lg font-medium">Contact Email 📧</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="bg-white/20 border-white/10 text-white placeholder:text-white/60"
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-white text-purple-700 hover:bg-purple-100 font-semibold text-lg"
              >
                <Sparkles className="mr-2" />
                {isSubmitting ? "Submitting..." : "Submit Your Idea"}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const StatsCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
  >
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-4">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
    <p className="text-purple-200">{description}</p>
  </motion.div>
);

export default SubmitIdea;