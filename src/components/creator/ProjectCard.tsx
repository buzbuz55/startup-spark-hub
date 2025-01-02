import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MapPin, Bookmark, Share2, Calendar } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    category: string;
    teamSize: number;
    stage: string;
    type: string;
    creator: string;
    date: string;
    isHiring: boolean;
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card className="bg-white border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-2">
            <Badge 
              variant="secondary" 
              className={`${
                project.stage === 'Growth Stage' ? 'bg-green-50 text-green-700' :
                project.stage === 'MVP Stage' ? 'bg-blue-50 text-blue-700' :
                project.stage === 'Idea Stage' ? 'bg-purple-50 text-purple-700' :
                'bg-orange-50 text-orange-700'
              }`}
            >
              {project.stage}
            </Badge>
            {project.isHiring && (
              <Badge className="bg-green-50 text-green-700">
                Hiring
              </Badge>
            )}
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="hover:text-purple-600">
              <Bookmark className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-purple-600">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>Team Size: {project.teamSize}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{project.category}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{project.date}</span>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
              <div>
                <p className="font-medium text-gray-900">{project.creator}</p>
                <p className="text-sm text-gray-500">Created by</p>
              </div>
            </div>
            <Button variant="outline" className="text-purple-600 border-purple-200 hover:bg-purple-50">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;