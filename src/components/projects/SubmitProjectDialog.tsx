import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Image as ImageIcon } from "lucide-react";

interface SubmitProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubmitProjectDialog = ({ isOpen, onClose }: SubmitProjectDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    team_size: 1,
    stage: "",
    location: "",
    collaboration_type: "",
    is_hiring: false,
  });

  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("Image size should be less than 5MB");
      return;
    }

    setProjectImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

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

      const { error } = await supabase.from('projects').insert({
        ...formData,
        user_id: user.id,
        status: 'active',
        image: imageUrl
      });

      if (error) throw error;

      toast.success("Project submitted successfully!");
      onClose();
      setFormData({
        title: "",
        description: "",
        category: "",
        team_size: 1,
        stage: "",
        location: "",
        collaboration_type: "",
        is_hiring: false,
      });
      setProjectImage(null);
      setImagePreview(null);
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || "Failed to submit project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Submit Your Impact Project</DialogTitle>
          <DialogDescription>
            Share your environmental impact project with our community.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Project Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <Textarea
              placeholder="Project Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="min-h-[100px]"
            />
          </div>
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
          <div>
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
          <div className="space-y-2">
            <label className="block text-sm font-medium">Project Image</label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="project-image"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("project-image")?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </Button>
              {imagePreview && (
                <div className="relative w-20 h-20">
                  <img
                    src={imagePreview}
                    alt="Project preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500">
              Max file size: 5MB. Supported formats: PNG, JPG, JPEG
            </p>
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
      </DialogContent>
    </Dialog>
  );
};

export default SubmitProjectDialog;