import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ProjectForm from "./submit/ProjectForm";

interface SubmitProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubmitProjectDialog = ({ isOpen, onClose }: SubmitProjectDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Submit Your Impact Project</DialogTitle>
          <DialogDescription>
            Share your environmental impact project with our community.
          </DialogDescription>
        </DialogHeader>
        <ProjectForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default SubmitProjectDialog;