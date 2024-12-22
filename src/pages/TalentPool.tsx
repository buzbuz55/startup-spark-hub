import Header from "@/components/Header";
import { useState } from "react";
import InternGrid from "@/components/talent/InternGrid";
import StartupIdeas from "@/components/talent/StartupIdeas";
import JobPostingForm from "@/components/talent/JobPostingForm";
import CandidateForm from "@/components/talent/CandidateForm";
import ChatBot from "@/components/talent/ChatBot";
import TalentHeader from "@/components/talent/TalentHeader";
import OpportunityCards from "@/components/talent/OpportunityCards";

const TalentPool = () => {
  const [searchQuery, setSearchQuery] = useState("");
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <TalentHeader onSearch={setSearchQuery} />
        
        <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
          <OpportunityCards />
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">Featured Interns</h2>
            <InternGrid />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-6">Hot Startup Opportunities</h2>
            <StartupIdeas />
          </section>

          <JobPostingForm 
            companyFormData={companyFormData}
            setCompanyFormData={setCompanyFormData}
          />

          <CandidateForm 
            candidateFormData={candidateFormData}
            setCandidateFormData={setCandidateFormData}
          />
        </div>
      </div>
      <ChatBot />
    </div>
  );
};

export default TalentPool;