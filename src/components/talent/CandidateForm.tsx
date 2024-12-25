import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import CandidateFormFields from "./candidate/CandidateFormFields";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to submit your profile");
        return;
      }

      if (!candidateFormData.resume) {
        toast.error("Please upload your resume");
        return;
      }

      // Upload resume to storage
      const fileExt = candidateFormData.resume.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, candidateFormData.resume);

      if (uploadError) throw uploadError;

      // Get resume URL
      const { data: { publicUrl: resumeUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName);

      // First, get or create a default position for general applications
      const { data: positions, error: positionError } = await supabase
        .from('team_positions')
        .select('id')
        .eq('title', 'General Application')
        .single();

      if (positionError && positionError.code !== 'PGRST116') {
        throw positionError;
      }

      let positionId;
      if (!positions) {
        // Create a default position for general applications
        const { data: newPosition, error: createError } = await supabase
          .from('team_positions')
          .insert({
            title: 'General Application',
            description: 'General talent pool application',
            company_id: process.env.PLATFORM_COMPANY_ID || '00000000-0000-0000-0000-000000000000',
            status: 'open'
          })
          .select()
          .single();

        if (createError) throw createError;
        positionId = newPosition.id;
      } else {
        positionId = positions.id;
      }

      // Create application
      const { error: applicationError } = await supabase
        .from('team_applications')
        .insert({
          position_id: positionId,
          applicant_id: user.id,
          email: candidateFormData.email,
          resume_url: resumeUrl,
          portfolio_url: candidateFormData.portfolio,
          cover_letter: candidateFormData.experience,
        });

      if (applicationError) throw applicationError;

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
    } catch (error) {
      console.error('Error submitting profile:', error);
      toast.error("Error submitting profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg animate-in fade-in-50 duration-500">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Submit Your Profile</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-100 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Complete your profile to connect with exciting opportunities
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <CandidateFormFields 
            candidateFormData={candidateFormData}
            setCandidateFormData={setCandidateFormData}
          />

          <div className="flex justify-end gap-4">
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
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Submitting...
                </div>
              ) : (
                "Submit Profile"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CandidateForm;