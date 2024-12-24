import { AnimatePresence } from "framer-motion";
import TalentPoolContent from "./TalentPoolContent";
import TalentPoolHeader from "./TalentPoolHeader";
import TalentHeader from "./TalentHeader";

interface MainContentProps {
  showInterns: boolean;
  setShowInterns: (show: boolean) => void;
  showJobForm: boolean;
  showCandidateForm: boolean;
  candidateFormData: {
    fullName: string;
    email: string;
    experience: string;
    portfolio: string;
    expectedSalary: string;
    resume: File | null;
    githubUrl: string;
  };
  setCandidateFormData: React.Dispatch<React.SetStateAction<{
    fullName: string;
    email: string;
    experience: string;
    portfolio: string;
    expectedSalary: string;
    resume: File | null;
    githubUrl: string;
  }>>;
  onCloseJobForm: () => void;
  onCloseCandidateForm: () => void;
  onSearch: (query: string) => void;
}

const MainContent = ({
  showInterns,
  setShowInterns,
  showJobForm,
  showCandidateForm,
  candidateFormData,
  setCandidateFormData,
  onCloseJobForm,
  onCloseCandidateForm,
  onSearch,
}: MainContentProps) => {
  return (
    <>
      <TalentPoolHeader 
        onPostJob={handlePostJob}
        onSubmitProfile={handleSubmitProfile}
      />

      <TalentHeader onSearch={onSearch} />

      <TalentPoolContent 
        showInterns={showInterns}
        setShowInterns={setShowInterns}
        showJobForm={showJobForm}
        showCandidateForm={showCandidateForm}
        candidateFormData={candidateFormData}
        setCandidateFormData={setCandidateFormData}
        onCloseJobForm={onCloseJobForm}
        onCloseCandidateForm={onCloseCandidateForm}
      />
    </>
  );
};

export default MainContent;