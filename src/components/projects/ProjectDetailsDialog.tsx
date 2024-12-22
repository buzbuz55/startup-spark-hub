import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Users, Info } from "lucide-react";
import { ProjectData } from "@/types/project";

interface ProjectDetailsDialogProps {
  project: ProjectData;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailsDialog = ({ project, isOpen, onClose }: ProjectDetailsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            {project.name}
            <Badge variant="secondary">{project.category}</Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6">
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Info className="w-5 h-5" /> About the Project
              </h3>
              <p className="text-gray-600">{project.description}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5" /> Team Requirements
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.seeking.map((role, idx) => (
                  <Badge key={idx} variant="outline">{role}</Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Funding</h4>
                <p className="text-green-600">{project.funding}</p>
              </div>
              <div>
                <h4 className="font-semibold">Impact</h4>
                <p className="text-gray-600">{project.impact}</p>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Visit Website
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsDialog;