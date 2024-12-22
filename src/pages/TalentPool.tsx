import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import InternGrid from "@/components/talent/InternGrid";
import StartupIdeas from "@/components/talent/StartupIdeas";
import JobPostingForm from "@/components/talent/JobPostingForm";
import CandidateForm from "@/components/talent/CandidateForm";
import TalentHeader from "@/components/talent/TalentHeader";
import OpportunityCards from "@/components/talent/OpportunityCards";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PlusCircle, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const TalentPool = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showInterns, setShowInterns] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showCandidateForm, setShowCandidateForm] = useState(false);
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
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <TalentHeader onSearch={setSearchQuery} />
          
          <div className="flex gap-4 mb-6">
            <Button 
              onClick={handlePostJob}
              className="bg-primary hover:bg-primary/90"
              size="lg"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Post a Job Opening
            </Button>

            <Button 
              onClick={handleSubmitProfile}
              variant="outline"
              size="lg"
              className="flex-shrink-0"
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Submit Your Profile
            </Button>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow-sm rounded-xl p-4 mb-6"
          >
            <OpportunityCards onInternshipsClick={() => setShowInterns(true)} />
          </motion.div>

          <AnimatePresence>
            {showInterns && (
              <motion.section
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">Available Interns</h2>
                    <Button 
                      variant="ghost"
                      onClick={() => setShowInterns(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Close
                    </Button>
                  </div>
                  <InternGrid />
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showJobForm && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <JobPostingForm 
                  companyFormData={{
                    position: "",
                    description: "",
                    requirements: "",
                    salary: ""
                  }}
                  setCompanyFormData={() => {}}
                  onClose={() => setShowJobForm(false)}
                />
              </motion.section>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showCandidateForm && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <CandidateForm 
                  candidateFormData={{
                    fullName: "",
                    email: "",
                    experience: "",
                    portfolio: "",
                    expectedSalary: "",
                    resume: null,
                    githubUrl: ""
                  }}
                  setCandidateFormData={() => {}}
                  onClose={() => setShowCandidateForm(false)}
                />
              </motion.section>
            )}
          </AnimatePresence>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Startup Opportunities</h2>
            <StartupIdeas />
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TalentPool;