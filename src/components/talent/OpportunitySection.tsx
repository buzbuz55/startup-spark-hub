import { motion } from "framer-motion";
import OpportunityCards from "./OpportunityCards";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const OpportunitySection = ({ setShowInterns }: { setShowInterns: (show: boolean) => void }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(null);

  useState(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  });

  const handlePostJob = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to post a job",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    setShowJobForm(true);
  };

  const handleSubmitProfile = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign up to submit your profile",
        variant: "destructive",
      });
      navigate("/signup");
      return;
    }
    setShowCandidateForm(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-sm rounded-xl p-4 mb-8"
    >
      <OpportunityCards onInternshipsClick={() => setShowInterns(true)} />
    </motion.div>
  );
};

export default OpportunitySection;