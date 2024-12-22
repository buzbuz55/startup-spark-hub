import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { toast } from "sonner";

interface JobPostingFormProps {
  companyFormData: {
    position: string;
    description: string;
    requirements: string;
    salary: string;
  };
  setCompanyFormData: React.Dispatch<React.SetStateAction<{
    position: string;
    description: string;
    requirements: string;
    salary: string;
  }>>;
  onClose: () => void;
}

const JobPostingForm = ({ companyFormData, setCompanyFormData, onClose }: JobPostingFormProps) => {
  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Job posting submitted successfully!");
    setCompanyFormData({
      position: "",
      description: "",
      requirements: "",
      salary: ""
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
      <h2 className="text-2xl font-bold mb-6">Post a Job Opening</h2>
      <form onSubmit={handleCompanySubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Position Title</label>
          <Input
            value={companyFormData.position}
            onChange={(e) => setCompanyFormData({...companyFormData, position: e.target.value})}
            placeholder="e.g., Frontend Developer"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Job Description</label>
          <Textarea
            value={companyFormData.description}
            onChange={(e) => setCompanyFormData({...companyFormData, description: e.target.value})}
            placeholder="Describe the role and responsibilities"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Requirements</label>
          <Textarea
            value={companyFormData.requirements}
            onChange={(e) => setCompanyFormData({...companyFormData, requirements: e.target.value})}
            placeholder="List the required skills and qualifications"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Salary Range</label>
          <Input
            value={companyFormData.salary}
            onChange={(e) => setCompanyFormData({...companyFormData, salary: e.target.value})}
            placeholder="e.g., $60,000 - $80,000"
            required
          />
        </div>
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Post Job Opening</Button>
        </div>
      </form>
    </div>
  );
};

export default JobPostingForm;