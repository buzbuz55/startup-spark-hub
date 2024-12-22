import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
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
  onClose: () => void;
}

const CandidateForm = ({ candidateFormData, setCandidateFormData, onClose }: CandidateFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
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
    onClose();
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 mb-8 relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>
      <h2 className="text-2xl font-bold mb-6">Submit Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <Input
            value={candidateFormData.fullName}
            onChange={(e) => setCandidateFormData({...candidateFormData, fullName: e.target.value})}
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            type="email"
            value={candidateFormData.email}
            onChange={(e) => setCandidateFormData({...candidateFormData, email: e.target.value})}
            placeholder="john@example.com"
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
            placeholder="https://yourportfolio.com"
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
          <label className="block text-sm font-medium mb-1">Expected Salary</label>
          <Input
            value={candidateFormData.expectedSalary}
            onChange={(e) => setCandidateFormData({...candidateFormData, expectedSalary: e.target.value})}
            placeholder="e.g., $60,000 - $80,000"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Resume</label>
          <Input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setCandidateFormData({...candidateFormData, resume: file});
            }}
            accept=".pdf,.doc,.docx"
            required
          />
        </div>
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Submit Profile</Button>
        </div>
      </form>
    </div>
  );
};

export default CandidateForm;