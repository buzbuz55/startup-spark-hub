import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { ProjectData } from "@/types/project";
import JoinProjectDialog from "./JoinProjectDialog";
import ProjectDetailsDialog from "./ProjectDetailsDialog";
import ProjectImage from "./ProjectImage";
import ProjectHeader from "./ProjectHeader";
import ProjectRoles from "./ProjectRoles";

const ProjectCard = ({ 
  id,
  name, 
  category, 
  description, 
  seeking, 
  funding, 
  impact, 
  image,
  iconName
}: ProjectData) => {
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <ProjectImage 
          image={image} 
          name={name} 
          onClick={() => setIsDetailsDialogOpen(true)} 
        />
        
        <ProjectHeader 
          name={name} 
          category={category} 
          iconName={iconName} 
        />

        <CardContent className="space-y-4">
          <p className="text-gray-600 line-clamp-2">{description}</p>
          
          <ProjectRoles seeking={seeking} />

          <div className="flex justify-between items-center pt-4">
            <div className="text-sm">
              <span className="font-semibold">Funding:</span>
              <span className="text-green-600 ml-2">{funding}</span>
            </div>
            <Button 
              variant="default"
              onClick={() => setIsJoinDialogOpen(true)}
            >
              Join Project
            </Button>
          </div>

          <div className="text-sm text-gray-600">
            <span className="font-semibold">Impact:</span>
            <span className="ml-2">{impact}</span>
          </div>

          <Button
            variant="ghost"
            className="w-full mt-2 flex items-center justify-center gap-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {isExpanded ? 'Show Less' : 'Show More'}
          </Button>

          {isExpanded && (
            <div className="space-y-4 pt-2 border-t">
              <div>
                <h4 className="font-semibold mb-2">Company Info</h4>
                <p className="text-sm text-gray-600">
                  A pioneering startup in the {category.toLowerCase()} sector, focused on creating sustainable solutions.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Contact</h4>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => window.location.href = '/messages'}
                >
                  <MessageSquare className="h-4 w-4" />
                  Chat with Team
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <JoinProjectDialog
        isOpen={isJoinDialogOpen}
        onClose={() => setIsJoinDialogOpen(false)}
        projectName={name}
        projectId={id}
      />

      <ProjectDetailsDialog
        project={{
          id,
          name,
          category,
          description,
          seeking,
          funding,
          impact,
          image,
          iconName
        }}
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
      />
    </>
  );
};

export default ProjectCard;