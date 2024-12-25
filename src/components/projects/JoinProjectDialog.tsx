import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface JoinProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  projectId: string; // Changed type to string to match UUID
}

const JoinProjectDialog = ({ isOpen, onClose, projectName, projectId }: JoinProjectDialogProps) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to submit your application");
        return;
      }

      if (!email) {
        toast.error("Please provide your email address");
        return;
      }

      // Get project creator's ID
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('user_id')
        .eq('id', projectId)
        .single();

      if (projectError) {
        console.error('Project error:', projectError);
        toast.error("Failed to fetch project details");
        return;
      }

      // Create the application
      const { error: applicationError } = await supabase
        .from('team_applications')
        .insert({
          position_id: projectId,
          applicant_id: user.id,
          cover_letter: message,
          email: email,
          status: 'pending'
        });

      if (applicationError) {
        console.error('Application error:', applicationError);
        toast.error("Failed to submit application");
        return;
      }

      // Create notification for project creator
      const { error: notificationError } = await supabase
        .from('notifications')
        .insert({
          user_id: projectData.user_id,
          type: 'application',
          title: 'New Project Application',
          message: `Someone has applied to join ${projectName}`,
          link: `/projects/${projectId}/applications`
        });

      if (notificationError) {
        console.error('Notification error:', notificationError);
        // Don't return here, as the application was still created successfully
      }

      toast.success("Application submitted successfully!");
      navigate(`/messages?project=${projectId}`);
      onClose();
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to submit application");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join {projectName}</DialogTitle>
          <DialogDescription>
            Submit your application to join this project. After submission, you'll be redirected to the chat to discuss details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Why do you want to join this project?
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your motivation and relevant experience..."
              className="h-32"
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit Application</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JoinProjectDialog;