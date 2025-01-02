import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Upload, Plus } from "lucide-react";

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
    team_size: 1, // Added default team size
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
          team_size: formData.team_size, // Include team_size in the insert
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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Logo size should be less than 5MB");
        return;
      }
      setProjectLogo(file);
      toast.success("Logo uploaded successfully!");
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
          <div className="space-y-4">
            {/* Logo Upload */}
            <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
              <Input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
              />
              <label htmlFor="logo-upload" className="flex flex-col items-center cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-400">Drop or upload your banner image here</span>
              </label>
            </div>

            {/* Project Title with Character Count */}
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Startup Spark"
              className="bg-[#2a2a2a] border-gray-700 text-white"
              maxLength={40}
            />
            <div className="text-right text-sm text-gray-400">
              {formData.title.length}/40
            </div>

            {/* Progress Steps */}
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

            {/* Description */}
            <Textarea
              value={formData.description}
              onChange={handleDescriptionChange}
              placeholder="Description"
              className="min-h-[100px] bg-[#2a2a2a] border-gray-700 text-white"
              maxLength={200}
            />
            <div className="text-right text-sm text-gray-400">
              {characterCount}/200
            </div>

            {/* Stage & Category */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Stage:</label>
                <Select
                  value={formData.stage}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, stage: value }))}
                >
                  <SelectTrigger className="bg-[#2a2a2a] border-gray-700 text-white">
                    <SelectValue placeholder="Growth Stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="idea">Idea Phase</SelectItem>
                    <SelectItem value="mvp">MVP</SelectItem>
                    <SelectItem value="beta">Beta</SelectItem>
                    <SelectItem value="growth">Growth</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Category:</label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="bg-[#2a2a2a] border-gray-700 text-white">
                    <SelectValue placeholder="Software" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="software">Software</SelectItem>
                    <SelectItem value="hardware">Hardware</SelectItem>
                    <SelectItem value="ai">AI & ML</SelectItem>
                    <SelectItem value="marketplace">Marketplace</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Website URL */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Website URL (optional)</label>
              <div className="flex items-center space-x-2 bg-[#2a2a2a] border border-gray-700 rounded-md p-2">
                <span className="text-gray-400">🔗</span>
                <Input
                  value={formData.website_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, website_url: e.target.value }))}
                  placeholder="https://example.com"
                  className="bg-transparent border-0 focus-visible:ring-0 text-white"
                />
              </div>
            </div>

            {/* Add Team Position Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full border-purple-500 text-purple-500 hover:bg-purple-500/10"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add open positions on your team
            </Button>
          </div>

          {/* Action Buttons */}
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