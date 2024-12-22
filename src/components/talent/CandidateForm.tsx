import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface CandidateFormProps {
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
}

const CandidateForm = ({ candidateFormData, setCandidateFormData }: CandidateFormProps) => {
  const handleCandidateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile submitted successfully!");
    setCandidateFormData({
      fullName: "",
      email: "",
      experience: "",
      portfolio: "",
      expectedSalary: "",
      resume: null,
      githubUrl: ""
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-6">Submit Your Profile</h2>
      <form onSubmit={handleCandidateSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <Input
            value={candidateFormData.fullName}
            onChange={(e) => setCandidateFormData({...candidateFormData, fullName: e.target.value})}
            placeholder="Your full name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            type="email"
            value={candidateFormData.email}
            onChange={(e) => setCandidateFormData({...candidateFormData, email: e.target.value})}
            placeholder="your.email@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Experience</label>
          <Textarea
            value={candidateFormData.experience}
            onChange={(e) => setCandidateFormData({...candidateFormData, experience: e.target.value})}
            placeholder="Describe your relevant experience"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Portfolio URL</label>
          <Input
            type="url"
            value={candidateFormData.portfolio}
            onChange={(e) => setCandidateFormData({...candidateFormData, portfolio: e.target.value})}
            placeholder="https://your-portfolio.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">GitHub URL</label>
          <Input
            type="url"
            value={candidateFormData.githubUrl}
            onChange={(e) => setCandidateFormData({...candidateFormData, githubUrl: e.target.value})}
            placeholder="https://github.com/yourusername"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expected Hourly Rate</label>
          <Input
            value={candidateFormData.expectedSalary}
            onChange={(e) => setCandidateFormData({...candidateFormData, expectedSalary: e.target.value})}
            placeholder="e.g., $25/hour"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Resume</label>
          <Input
            type="file"
            onChange={(e) => setCandidateFormData({
              ...candidateFormData,
              resume: e.target.files ? e.target.files[0] : null
            })}
            accept=".pdf,.doc,.docx"
            required
          />
          <p className="text-sm text-gray-500 mt-1">Upload your resume (PDF, DOC, or DOCX)</p>
        </div>
        <Button type="submit" className="w-full">Submit Profile</Button>
      </form>
    </div>
  );
};

export default CandidateForm;