import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface ProjectCardProps {
  id: number;
  name: string;
  category: string;
  description: string;
  seeking: string[];
  funding: string;
  impact: string;
  image: string;
  icon: LucideIcon;
}

const ProjectCard = ({ 
  name, 
  category, 
  description, 
  seeking, 
  funding, 
  impact, 
  image, 
  icon: Icon 
}: ProjectCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden rounded-t-lg">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Icon className="w-6 h-6" />
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
          <Link to="/submit-idea">
            <Button variant="default">Join Project</Button>
          </Link>
        </div>

        <div className="text-sm text-gray-600">
          <span className="font-semibold">Impact:</span>
          <span className="ml-2">{impact}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;