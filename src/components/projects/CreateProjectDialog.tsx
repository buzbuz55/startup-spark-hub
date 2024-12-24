import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ProjectBasicInfo } from "./create/ProjectBasicInfo";
import { ProjectLogoUpload } from "./create/ProjectLogoUpload";
import { ProjectCategories } from "./create/ProjectCategories";
import { ProjectGoals } from "./create/ProjectGoals";
import { useNavigate } from "react-router-dom";

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateProjectDialog = ({ open, onOpenChange }: CreateProjectDialogProps) => {
  const navigate = useNavigate();
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
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        toast.error("Please sign in to create a project");
        navigate("/login");
        return;
      }

      // First check if user has a profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Profile error:', profileError);
        toast.error("Error accessing user profile");
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

  const updateFormData = (newData: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <ProjectLogoUpload
            projectLogo={projectLogo}
            onLogoUpload={setProjectLogo}
          />
          
          <ProjectBasicInfo
            formData={formData}
            onChange={updateFormData}
          />
          
          <ProjectCategories
            formData={formData}
            onChange={updateFormData}
          />
          
          <ProjectGoals
            formData={formData}
            onChange={updateFormData}
          />

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