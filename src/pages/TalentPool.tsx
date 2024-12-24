import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OpportunityCards from "@/components/talent/OpportunityCards";
import TalentHeader from "@/components/talent/TalentHeader";
import TalentPoolHeader from "@/components/talent/TalentPoolHeader";
import TalentPoolContent from "@/components/talent/TalentPoolContent";

const TalentPool = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showInterns, setShowInterns] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showCandidateForm, setShowCandidateForm] = useState(false);
  const [candidateFormData, setCandidateFormData] = useState({
    fullName: "",
    email: "",
    experience: "",
    portfolio: "",
    expectedSalary: "",
    resume: null as File | null,
    githubUrl: ""
  });

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/30 backdrop-blur-sm shadow-sm rounded-xl p-4 mb-6"
          >
            <OpportunityCards onInternshipsClick={() => setShowInterns(true)} />
          </motion.div>

          <TalentPoolHeader 
            onPostJob={handlePostJob}
            onSubmitProfile={handleSubmitProfile}
          />

          <TalentHeader onSearch={setSearchQuery} />

          <TalentPoolContent 
            showInterns={showInterns}
            setShowInterns={setShowInterns}
            showJobForm={showJobForm}
            showCandidateForm={showCandidateForm}
            candidateFormData={candidateFormData}
            setCandidateFormData={setCandidateFormData}
            onCloseJobForm={() => setShowJobForm(false)}
            onCloseCandidateForm={() => setShowCandidateForm(false)}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TalentPool;