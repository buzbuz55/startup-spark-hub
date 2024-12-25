import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, Briefcase, Mail, Globe, Github, DollarSign } from "lucide-react";

interface CandidateFormFieldsProps {
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

const CandidateFormFields = ({ candidateFormData, setCandidateFormData }: CandidateFormFieldsProps) => {
  return (
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
  );
};

export default CandidateFormFields;