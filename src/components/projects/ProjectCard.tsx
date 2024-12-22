import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import JoinProjectDialog from "./JoinProjectDialog";
import ProjectDetailsDialog from "./ProjectDetailsDialog";
import { optimizeImage } from "@/utils/imageOptimizer";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { ProjectData } from "@/types/project";

type ProjectCardProps = ProjectData;

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
}: ProjectCardProps) => {
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const DynamicIcon = (Icons as any)[iconName] || Icons.FileQuestion;
  const optimizedImageUrl = optimizeImage(image);

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <div 
          className="relative h-48 overflow-hidden rounded-t-lg bg-gray-100 cursor-pointer"
          onClick={() => setIsDetailsDialogOpen(true)}
        >
          {!imageLoaded && (
            <Skeleton className="w-full h-full absolute top-0 left-0" />
          )}
          <img 
            src={optimizedImageUrl}
            alt={name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </div>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <DynamicIcon className="w-6 h-6" />
              {name}
            </span>
            <Badge variant="secondary">{category}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 line-clamp-2">{description}</p>
          
          <div>
            <h4 className="font-semibold mb-2">Looking for:</h4>
            <div className="flex flex-wrap gap-2">
              {seeking.map((role, idx) => (
                <Badge key={idx} variant="outline">{role}</Badge>
              ))}
            </div>
          </div>

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