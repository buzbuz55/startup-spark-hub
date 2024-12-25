import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Upload, Briefcase, Mail, Globe, Github, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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

      // Create application
      const { error: applicationError } = await supabase
        .from('team_applications')
        .insert({
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
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <Input
                    id="fullName"
                    value={candidateFormData.fullName}
                    onChange={(e) => setCandidateFormData({...candidateFormData, fullName: e.target.value})}
                    placeholder="John Doe"
                    required
                    className="pl-10"
                  />
                  <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={candidateFormData.email}
                    onChange={(e) => setCandidateFormData({...candidateFormData, email: e.target.value})}
                    placeholder="john@example.com"
                    required
                    className="pl-10"
                  />
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Professional Experience</Label>
              <Textarea
                id="experience"
                value={candidateFormData.experience}
                onChange={(e) => setCandidateFormData({...candidateFormData, experience: e.target.value})}
                placeholder="Share your relevant experience, skills, and achievements..."
                required
                className="min-h-[120px]"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="portfolio">Portfolio URL</Label>
                <div className="relative">
                  <Input
                    id="portfolio"
                    type="url"
                    value={candidateFormData.portfolio}
                    onChange={(e) => setCandidateFormData({...candidateFormData, portfolio: e.target.value})}
                    placeholder="https://yourportfolio.com"
                    className="pl-10"
                  />
                  <Globe className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <div className="relative">
                  <Input
                    id="githubUrl"
                    type="url"
                    value={candidateFormData.githubUrl}
                    onChange={(e) => setCandidateFormData({...candidateFormData, githubUrl: e.target.value})}
                    placeholder="https://github.com/yourusername"
                    className="pl-10"
                  />
                  <Github className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedSalary">Expected Salary</Label>
              <div className="relative">
                <Input
                  id="expectedSalary"
                  value={candidateFormData.expectedSalary}
                  onChange={(e) => setCandidateFormData({...candidateFormData, expectedSalary: e.target.value})}
                  placeholder="e.g., $60,000 - $80,000"
                  required
                  className="pl-10"
                />
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resume">Resume</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="resume"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setCandidateFormData({...candidateFormData, resume: file});
                  }}
                  accept=".pdf,.doc,.docx"
                  required
                  className="cursor-pointer"
                />
                {candidateFormData.resume && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setCandidateFormData({...candidateFormData, resume: null})}
                    className="hover:bg-red-50 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Upload your resume (PDF, DOC, or DOCX format)
              </p>
            </div>
          </div>

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