import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { LogoUpload } from "./create/LogoUpload";
import { ProjectForm } from "./create/ProjectForm";

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
    stage: "",
    website_url: "",
    team_size: 1,
  });
  const [currentStep] = useState(1);
  const [characterCount, setCharacterCount] = useState(0);

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
          stage: formData.stage,
          logo_url: logoUrl,
          website_url: formData.website_url,
          team_size: formData.team_size,
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

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setCharacterCount(text.length);
    setFormData(prev => ({ ...prev, description: text }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-[#1a1a1a] text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">Create Project</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <LogoUpload onLogoUpload={setProjectLogo} />

          <div className="flex items-center justify-between px-4 py-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === currentStep ? 'bg-purple-600' : 'bg-gray-700'
                }`}>
                  {step}
                </div>
                {step < 5 && (
                  <div className="w-12 h-[2px] bg-gray-700 mx-2" />
                )}
              </div>
            ))}
          </div>

          <ProjectForm
            formData={formData}
            characterCount={characterCount}
            onFormChange={(data) => setFormData(prev => ({ ...prev, ...data }))}
            onDescriptionChange={handleDescriptionChange}
          />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-700 text-gray-400 hover:bg-gray-800"
            >
              CANCEL
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-600 text-white hover:bg-purple-700"
            >
              PUBLISH
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;