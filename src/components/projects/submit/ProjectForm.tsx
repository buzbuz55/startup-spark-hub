import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ProjectImageUpload from "./ProjectImageUpload";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ProjectFormProps {
  onClose: () => void;
  onSubmitSuccess: () => void;
}

const ProjectForm = ({ onClose, onSubmitSuccess }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    team_size: 1,
    stage: "",
    location: "",
    collaboration_type: "",
    is_hiring: true,
  });

  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        toast.error("Please sign in to submit a project");
        return;
      }

      let imageUrl = null;
      if (projectImage) {
        const fileExt = projectImage.name.split('.').pop();
        const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('project_images')
          .upload(filePath, projectImage);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('project_images')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      const { error: projectError } = await supabase
        .from('projects')
        .insert({
          ...formData,
          user_id: user.id,
          logo_url: imageUrl,
          status: 'active'
        });

      if (projectError) throw projectError;

      onSubmitSuccess();
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to submit project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ProjectImageUpload onImageSelect={setProjectImage} />

      <div className="space-y-4">
        <Input
          placeholder="Project Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <Textarea
          placeholder="Project Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          className="min-h-[100px]"
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Green Energy">Green Energy</SelectItem>
              <SelectItem value="Clean Water">Clean Water</SelectItem>
              <SelectItem value="Sustainable Agriculture">Sustainable Agriculture</SelectItem>
              <SelectItem value="Conservation">Conservation</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Team Size"
            value={formData.team_size}
            onChange={(e) => setFormData({ ...formData, team_size: parseInt(e.target.value) })}
            required
            min="1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            value={formData.stage}
            onValueChange={(value) => setFormData({ ...formData, stage: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Project Stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="concept">Concept</SelectItem>
              <SelectItem value="prototype">Prototype</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="launched">Launched</SelectItem>
              <SelectItem value="scaling">Scaling</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>

        <Select
          value={formData.collaboration_type}
          onValueChange={(value) => setFormData({ ...formData, collaboration_type: value })}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Collaboration Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="part-time">Part-time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="volunteer">Volunteer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onClose} type="button">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Project"}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;