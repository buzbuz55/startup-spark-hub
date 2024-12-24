import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateProjectDialog = ({ open, onOpenChange }: CreateProjectDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projectLogo, setProjectLogo] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    teamSize: "",
    stage: "",
    location: "",
    goal: "",
    targetAudience: "",
    timeline: "",
    fundingNeeded: "",
    collaborationType: "",
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Logo size should be less than 5MB");
        return;
      }
      setProjectLogo(file);
      toast.success("Logo uploaded successfully!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        toast.error("Please sign in to create a project");
        return;
      }

      let logoUrl = null;
      if (projectLogo) {
        const fileExt = projectLogo.name.split('.').pop();
        const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('project_logos')
          .upload(filePath, projectLogo);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('project_logos')
          .getPublicUrl(filePath);

        logoUrl = publicUrl;
      }

      const { error: projectError } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          title: formData.title,
          description: formData.description,
          category: formData.category,
          team_size: parseInt(formData.teamSize),
          stage: formData.stage,
          location: formData.location,
          logo_url: logoUrl,
          goal: formData.goal,
          target_audience: formData.targetAudience,
          timeline: formData.timeline,
          funding_needed: parseFloat(formData.fundingNeeded),
          collaboration_type: formData.collaborationType,
          is_hiring: true,
          status: 'active'
        });

      if (projectError) throw projectError;

      toast.success("Project created successfully!");
      onOpenChange(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to create project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Project Logo</Label>
              <div className="flex items-center gap-4 mt-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("logo-upload")?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Logo
                </Button>
                {projectLogo && (
                  <span className="text-sm text-green-600">
                    Logo uploaded: {projectLogo.name}
                  </span>
                )}
              </div>
            </div>

            <div>
              <Label>Project Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter your project title"
                required
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your project"
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="software">Software</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="ai">AI & ML</SelectItem>
                    <SelectItem value="ecommerce">E-Commerce</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Team Size</Label>
                <Input
                  type="number"
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  placeholder="Number of team members"
                  required
                  min="1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Project Stage</Label>
                <Select
                  value={formData.stage}
                  onValueChange={(value) => setFormData({ ...formData, stage: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="idea">Idea Phase</SelectItem>
                    <SelectItem value="mvp">MVP</SelectItem>
                    <SelectItem value="growth">Growth</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Location</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => setFormData({ ...formData, location: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="onsite">On-site</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Project Goal</Label>
              <Textarea
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                placeholder="What are you trying to achieve?"
                required
              />
            </div>

            <div>
              <Label>Target Audience</Label>
              <Input
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                placeholder="Who is this project for?"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Timeline</Label>
                <Input
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  placeholder="Expected timeline"
                  required
                />
              </div>

              <div>
                <Label>Funding Needed</Label>
                <Input
                  type="number"
                  value={formData.fundingNeeded}
                  onChange={(e) => setFormData({ ...formData, fundingNeeded: e.target.value })}
                  placeholder="Amount in USD"
                />
              </div>
            </div>

            <div>
              <Label>Collaboration Type</Label>
              <Select
                value={formData.collaborationType}
                onValueChange={(value) => setFormData({ ...formData, collaborationType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select collaboration type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="volunteer">Volunteer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;