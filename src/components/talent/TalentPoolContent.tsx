import { AnimatePresence, motion } from "framer-motion";
import InternGrid from "./InternGrid";
import JobPostingForm from "./JobPostingForm";
import CandidateForm from "./CandidateForm";
import { Button } from "@/components/ui/button";

interface TalentPoolContentProps {
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
}

const TalentPoolContent = ({
  showInterns,
  setShowInterns,
  showJobForm,
  showCandidateForm,
  candidateFormData,
  setCandidateFormData,
  onCloseJobForm,
  onCloseCandidateForm
}: TalentPoolContentProps) => {
  return (
    <>
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
            <JobPostingForm onClose={onCloseJobForm} />
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
              candidateFormData={candidateFormData}
              setCandidateFormData={setCandidateFormData}
              onClose={onCloseCandidateForm}
            />
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default TalentPoolContent;