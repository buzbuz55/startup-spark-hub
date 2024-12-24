import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OpportunitySection from "@/components/talent/OpportunitySection";
import MainContent from "@/components/talent/MainContent";

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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-12 pb-16">
        <div className="max-w-6xl mx-auto">
          <OpportunitySection setShowInterns={setShowInterns} />
          
          <MainContent 
            showInterns={showInterns}
            setShowInterns={setShowInterns}
            showJobForm={showJobForm}
            showCandidateForm={showCandidateForm}
            candidateFormData={candidateFormData}
            setCandidateFormData={setCandidateFormData}
            onCloseJobForm={() => setShowJobForm(false)}
            onCloseCandidateForm={() => setShowCandidateForm(false)}
            onSearch={setSearchQuery}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TalentPool;