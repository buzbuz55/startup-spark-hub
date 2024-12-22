import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Upload } from "lucide-react";

interface JoinTeamFormProps {
  projectId: string;
  position?: string;
}

const JoinTeamForm = ({ projectId, position }: JoinTeamFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resume, setResume] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      if (!resume) {
        toast.error("Please upload your resume");
        return;
      }

      // Upload resume to Supabase Storage
      const fileExt = resume.name.split('.').pop();
      const filePath = `${projectId}/${crypto.randomUUID()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, resume);

      if (uploadError) throw uploadError;

      const { error: applicationError } = await supabase
        .from('team_applications')
        .insert({
          position_id: projectId,
          portfolio_url: formData.get('portfolio'),
          cover_letter: formData.get('coverLetter'),
          resume_url: uploadData?.path
        });

      if (applicationError) throw applicationError;

      toast.success("Application submitted successfully!");
      e.currentTarget.reset();
      setResume(null);
    } catch (error) {
      toast.error("Failed to submit application");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Resume</label>
        <Input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files?.[0] || null)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Portfolio URL (optional)</label>
        <Input
          name="portfolio"
          type="url"
          placeholder="https://your-portfolio.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Cover Letter</label>
        <Textarea
          name="coverLetter"
          placeholder="Tell us why you're interested in joining the team..."
          required
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        <Upload className="w-4 h-4 mr-2" />
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
};

export default JoinTeamForm;