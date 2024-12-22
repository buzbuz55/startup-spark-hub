import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface JoinTeamFormProps {
  positionId: string;
  onClose: () => void;
}

const JoinTeamForm = ({ positionId, onClose }: JoinTeamFormProps) => {
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to submit your application");
        return;
      }

      const { error } = await supabase
        .from('team_applications')
        .insert([{
          position_id: positionId,
          applicant_id: user.id,
          portfolio_url: portfolioUrl,
          cover_letter: coverLetter,
          resume_url: resumeUrl,
          status: 'pending'
        }]);

      if (error) throw error;

      toast.success("Application submitted successfully!");
      onClose();
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="url"
          placeholder="Portfolio URL (optional)"
          value={portfolioUrl}
          onChange={(e) => setPortfolioUrl(e.target.value)}
        />
      </div>
      <div>
        <Input
          type="url"
          placeholder="Resume URL (optional)"
          value={resumeUrl}
          onChange={(e) => setResumeUrl(e.target.value)}
        />
      </div>
      <div>
        <Textarea
          placeholder="Cover Letter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          className="min-h-[100px]"
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
};

export default JoinTeamForm;