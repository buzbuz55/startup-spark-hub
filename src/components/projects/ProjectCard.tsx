
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Calendar, Bookmark, Share2 } from "lucide-react";
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
  image?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);

  const handleJoinClick = () => {
    setIsJoinDialogOpen(true);
  };

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'idea':
        return 'bg-purple-500/10 text-purple-500';
      case 'mvp':
        return 'bg-blue-500/10 text-blue-500';
      case 'growth':
        return 'bg-green-500/10 text-green-500';
      case 'fundraising':
        return 'bg-orange-500/10 text-orange-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <Card className="overflow-hidden bg-[#161B22] border-gray-700 text-white hover:border-gray-600 transition-all">
      <ProjectImage
        image={project.image || "/placeholder.svg"}
        name={project.title}
        onClick={handleJoinClick}
      />
      <div className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            <Badge className={getStageColor(project.stage)}>
              {project.stage}
            </Badge>
            {project.is_hiring && (
              <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                Hiring
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Bookmark className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {project.team_size} members
          </div>
          {project.location && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {project.location}
            </div>
          )}
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-700 mr-3"></div>
            <div>
              <p className="text-sm font-medium">{project.created_by_username || 'Anonymous'}</p>
              <p className="text-xs text-gray-400">Created by</p>
            </div>
          </div>
          <Button 
            variant="secondary" 
            onClick={handleJoinClick}
            className="bg-[#2D333B] text-white hover:bg-[#373E47]"
          >
            View Details
          </Button>
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
