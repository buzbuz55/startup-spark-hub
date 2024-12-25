import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to post a job");
        return;
      }

      // Create a new team position
      const { error } = await supabase
        .from('team_positions')
        .insert({
          title: companyFormData.position,
          description: companyFormData.description,
          requirements: companyFormData.requirements.split(',').map(req => req.trim()),
          status: 'open'
        });

      if (error) throw error;

      toast.success("Job posting submitted successfully!");
      setCompanyFormData({
        position: "",
        description: "",
        requirements: "",
        salary: ""
      });
      onClose();
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error("Failed to submit job posting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 mb-8 relative animate-in slide-in-from-top-4">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4 hover:bg-gray-100"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>

      <h2 className="text-2xl font-bold mb-6">Post a Job Opening</h2>
      
      <form onSubmit={handleCompanySubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Position Title *</label>
          <Input
            value={companyFormData.position}
            onChange={(e) => setCompanyFormData({...companyFormData, position: e.target.value})}
            placeholder="e.g., Frontend Developer"
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Job Description *</label>
          <Textarea
            value={companyFormData.description}
            onChange={(e) => setCompanyFormData({...companyFormData, description: e.target.value})}
            placeholder="Describe the role and responsibilities"
            required
            className="min-h-[120px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Requirements *</label>
          <Textarea
            value={companyFormData.requirements}
            onChange={(e) => setCompanyFormData({...companyFormData, requirements: e.target.value})}
            placeholder="List the required skills and qualifications (comma-separated)"
            required
            className="min-h-[100px]"
          />
          <p className="text-sm text-muted-foreground">
            Separate requirements with commas (e.g., React, TypeScript, 3+ years experience)
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Salary Range</label>
          <Input
            value={companyFormData.salary}
            onChange={(e) => setCompanyFormData({...companyFormData, salary: e.target.value})}
            placeholder="e.g., $60,000 - $80,000"
            className="w-full"
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="min-w-[100px]"
          >
            {isSubmitting ? "Posting..." : "Post Job"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobPostingForm;