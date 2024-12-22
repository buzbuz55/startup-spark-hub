import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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

      const { error } = await supabase.from('projects').insert({
        ...formData,
        user_id: user.id,
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
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to submit project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Submit Your Impact Project</DialogTitle>
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
                <SelectItem value="Waste Management">Waste Management</SelectItem>
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
                <SelectItem value="Idea">Idea</SelectItem>
                <SelectItem value="MVP">MVP</SelectItem>
                <SelectItem value="Beta">Beta</SelectItem>
                <SelectItem value="Live">Live</SelectItem>
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
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Volunteer">Volunteer</SelectItem>
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
      </DialogContent>
    </Dialog>
  );
};

export default SubmitProjectDialog;