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
import { Globe, MessageSquare, Copy, MoreVertical } from "lucide-react";
import { useState } from "react";

interface ProjectDetailsDialogProps {
  project: ProjectData;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailsDialog = ({ project, isOpen, onClose }: ProjectDetailsDialogProps) => {
  const [activeTab, setActiveTab] = useState("details");
  
  const openPositions = [
    "SOFTWARE DEVELOPER",
    "MOBILE APP DEVELOPER (IOS)",
    "BACKEND DEVELOPER",
    "FULL-STACK DEVELOPER",
    "SECURITY ENGINEER"
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
              <h2 className="text-3xl font-bold">{project.name}</h2>
              <Button variant="outline" className="gap-2">
                <Globe className="h-4 w-4" />
                Visit Website
              </Button>
            </div>
            <p className="text-lg text-muted-foreground mt-2">
              {project.description}
            </p>
          </DialogHeader>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Category:</span>
                <Badge variant="secondary" className="ml-2">
                  {project.category}
                </Badge>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Team Size:</span>
                <span className="ml-2">1</span>
              </div>
            </div>
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
                TEAM MEMBERS
              </TabsTrigger>
              <TabsTrigger
                value="comments"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12"
              >
                COMMENTS (1)
              </TabsTrigger>
              <TabsTrigger
                value="posts"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12"
              >
                POSTS
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Open positions:</h3>
                  <div className="flex flex-wrap gap-3">
                    {openPositions.map((position, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 cursor-pointer"
                      >
                        {position}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Funding:</h3>
                  <p>{project.funding}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Impact:</h3>
                  <p>{project.impact}</p>
                </div>
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
                      <h4 className="font-semibold">Cash Flow</h4>
                      <span className="text-muted-foreground">@BVH</span>
                      <Badge className="bg-purple-600 text-white">FOUNDER</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comments" className="mt-6">
              <div className="flex items-center gap-4 p-4 rounded-lg border">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <p className="text-muted-foreground">No comments yet</p>
              </div>
            </TabsContent>

            <TabsContent value="posts" className="mt-6">
              <div className="flex items-center gap-4 p-4 rounded-lg border">
                <Copy className="h-5 w-5 text-muted-foreground" />
                <p className="text-muted-foreground">No posts yet</p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between items-center mt-6 pt-6 border-t">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </Button>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="default" size="sm">
              Apply Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsDialog;