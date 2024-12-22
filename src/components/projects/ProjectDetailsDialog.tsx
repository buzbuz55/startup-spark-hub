import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { ProjectData } from "@/types/project";
import { 
  Globe, 
  MessageSquare, 
  Copy, 
  MoreVertical, 
  Users,
  Target,
  Rocket,
  DollarSign,
  Building,
  Calendar
} from "lucide-react";
import { useState } from "react";
import ProjectComments from "./ProjectComments";
import OpenPositions from "./OpenPositions";
import { formatDistanceToNow } from "date-fns";

interface ProjectDetailsDialogProps {
  project: ProjectData;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailsDialog = ({ project, isOpen, onClose }: ProjectDetailsDialogProps) => {
  const [activeTab, setActiveTab] = useState("details");

  const projectStats = [
    {
      icon: <Users className="w-4 h-4" />,
      label: "Team Size",
      value: "1-5 members"
    },
    {
      icon: <Target className="w-4 h-4" />,
      label: "Stage",
      value: "MVP Phase"
    },
    {
      icon: <DollarSign className="w-4 h-4" />,
      label: "Funding",
      value: project.funding
    },
    {
      icon: <Building className="w-4 h-4" />,
      label: "Category",
      value: project.category
    }
  ];

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
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">{project.name}</h2>
                <p className="text-sm text-muted-foreground">
                  Founded {formatDistanceToNow(new Date(2023, 0, 1))} ago
                </p>
              </div>
              <Button variant="outline" className="gap-2">
                <Globe className="h-4 w-4" />
                Visit Website
              </Button>
            </div>
            <p className="text-lg text-muted-foreground mt-4">
              {project.description}
            </p>
          </DialogHeader>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {projectStats.map((stat, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  {stat.icon}
                  <span className="text-sm">{stat.label}</span>
                </div>
                <p className="font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>

          <Tabs defaultValue="details" className="mt-6">
            <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent">
              <TabsTrigger
                value="details"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12"
              >
                DETAILS
              </TabsTrigger>
              <TabsTrigger
                value="team"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12"
              >
                TEAM
              </TabsTrigger>
              <TabsTrigger
                value="impact"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12"
              >
                IMPACT
              </TabsTrigger>
              <TabsTrigger
                value="comments"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12"
              >
                COMMENTS
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Project Overview</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Looking For:</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.seeking.map((role, index) => (
                      <Badge key={index} variant="secondary">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>

                <OpenPositions projectId={project.id} />
              </div>
            </TabsContent>

            <TabsContent value="team" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg border">
                  <Avatar className="h-12 w-12">
                    <img src={project.image} alt="Team member" />
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">Project Lead</h4>
                      <Badge className="bg-purple-600 text-white">FOUNDER</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Leading product development and strategy
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="impact" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Impact Metrics</h3>
                  <p className="text-muted-foreground">{project.impact}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Funding Details</h3>
                  <p className="text-muted-foreground">Current Funding: {project.funding}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comments" className="mt-6">
              <ProjectComments projectId={project.id} />
            </TabsContent>
          </Tabs>

          <div className="flex justify-between items-center mt-6 pt-6 border-t">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Team
              </Button>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="default" size="sm">
              <Rocket className="h-4 w-4 mr-2" />
              Join Project
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsDialog;