import Header from "@/components/Header";
import { useState } from "react";
import InternGrid from "@/components/talent/InternGrid";
import StartupIdeas from "@/components/talent/StartupIdeas";
import JobPostingForm from "@/components/talent/JobPostingForm";
import CandidateForm from "@/components/talent/CandidateForm";
import ChatBot from "@/components/talent/ChatBot";
import TalentHeader from "@/components/talent/TalentHeader";
import OpportunityCards from "@/components/talent/OpportunityCards";
import { AnimatePresence, motion } from "framer-motion";

const TalentPool = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showInterns, setShowInterns] = useState(false);
  const [companyFormData, setCompanyFormData] = useState({
    position: "",
    description: "",
    requirements: "",
    salary: ""
  });

  const [candidateFormData, setCandidateFormData] = useState({
    fullName: "",
    email: "",
    experience: "",
    portfolio: "",
    expectedSalary: "",
    resume: null as File | null,
    githubUrl: ""
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <TalentHeader onSearch={setSearchQuery} />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow-sm rounded-xl p-4 md:p-6 mb-8"
          >
            <OpportunityCards onInternshipsClick={() => setShowInterns(true)} />
          </motion.div>

          <AnimatePresence>
            {showInterns ? (
              <motion.section
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">Available Interns</h2>
                    <button 
                      onClick={() => setShowInterns(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Close
                    </button>
                  </div>
                  <InternGrid />
                </div>
              </motion.section>
            ) : null}
          </AnimatePresence>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Startup Opportunities</h2>
            <StartupIdeas />
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <JobPostingForm 
              companyFormData={companyFormData}
              setCompanyFormData={setCompanyFormData}
            />

            <CandidateForm 
              candidateFormData={candidateFormData}
              setCandidateFormData={setCandidateFormData}
            />
          </motion.section>
        </div>
      </div>
      <ChatBot />
    </div>
  );
};

export default TalentPool;