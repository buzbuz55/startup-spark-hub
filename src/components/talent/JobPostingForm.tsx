import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
}

const JobPostingForm = ({ companyFormData, setCompanyFormData }: JobPostingFormProps) => {
  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Job posting submitted successfully!");
    setCompanyFormData({
      position: "",
      description: "",
      requirements: "",
      salary: ""
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
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
        <Button type="submit" className="w-full">Post Job Opening</Button>
      </form>
    </div>
  );
};

export default JobPostingForm;
