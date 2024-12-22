import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface JoinProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  projectId: string;
}

const JoinProjectDialog = ({ isOpen, onClose, projectName, projectId }: JoinProjectDialogProps) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send this data to your backend
    console.log("Submitting application for project:", projectId, message);
    
    // Show success message
    toast.success("Application submitted successfully!");
    
    // Navigate to messages page with the project context
    navigate(`/messages?project=${projectId}`);
    onClose();
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