import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Calendar } from "lucide-react";
import ProjectImage from "./ProjectImage";
import JoinProjectDialog from "./JoinProjectDialog";
import { formatDistanceToNow } from "date-fns";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  team_size: number;
  stage: string;
  location?: string;
  collaboration_type?: string;
  is_hiring?: boolean;
  created_at: string;
  created_by_username?: string;
  website_url?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);

  const handleJoinClick = () => {
    setIsJoinDialogOpen(true);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <ProjectImage
        image="/placeholder.svg"
        name={project.title}
        onClick={handleJoinClick}
      />
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold line-clamp-1">{project.title}</h3>
          <Badge variant="secondary" className="ml-2">
            {project.category}
          </Badge>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            {project.team_size} members
          </div>
          {project.location && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              {project.location}
            </div>
          )}
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="default" onClick={handleJoinClick}>
            Join Project
          </Button>
          {project.is_hiring && (
            <Badge variant="secondary" className="ml-2">
              Hiring
            </Badge>
          )}
        </div>
      </div>

      <JoinProjectDialog
        isOpen={isJoinDialogOpen}
        onClose={() => setIsJoinDialogOpen(false)}
        projectName={project.title}
        projectId={project.id}
      />
    </Card>
  );
};

export default ProjectCard;