import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectData } from "@/types/project";
import { Globe, MessageSquare, MoreVertical, Rocket } from "lucide-react";
import { useState } from "react";
import CompanyProfile from "./company/CompanyProfile";
import JoinTeamForm from "./company/JoinTeamForm";
import ProjectTabs from "./tabs/ProjectTabs";

interface ProjectDetailsDialogProps {
  project: ProjectData;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailsDialog = ({ project, isOpen, onClose }: ProjectDetailsDialogProps) => {
  const [showJoinForm, setShowJoinForm] = useState(false);

  const handleCloseJoinForm = () => {
    setShowJoinForm(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background">
        <div className="relative h-48">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-400 to-orange-500">
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <Badge className="mb-2 bg-yellow-600 text-white">Cofounding</Badge>
              <Badge className="ml-2 bg-orange-400 text-white">MVP Phase</Badge>
            </div>
          </div>
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-contain p-4"
          />
        </div>

        <div className="p-6">
          <DialogHeader>
            <CompanyProfile 
              company={{
                name: project.name,
                website: "https://example.com",
                teamSize: "1-10",
                funding: project.funding,
                location: "Global"
              }}
            />
          </DialogHeader>

          {showJoinForm ? (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Join the Team</h3>
              <JoinTeamForm 
                positionId={project.id} 
                onClose={handleCloseJoinForm}
              />
            </div>
          ) : (
            <ProjectTabs project={project} />
          )}

          <div className="flex justify-between items-center mt-6 pt-6 border-t">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Team
              </Button>
              <Button variant="outline" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                Visit Website
              </Button>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              variant="default" 
              size="sm"
              onClick={() => setShowJoinForm(!showJoinForm)}
            >
              <Rocket className="h-4 w-4 mr-2" />
              {showJoinForm ? "View Project Details" : "Join Project"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsDialog;