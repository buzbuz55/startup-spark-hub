import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ProjectData } from "@/types/project";
import ProjectComments from "../ProjectComments";
import OpenPositions from "../OpenPositions";

interface ProjectTabsProps {
  project: ProjectData;
}

const ProjectTabs = ({ project }: ProjectTabsProps) => {
  return (
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
  );
};

export default ProjectTabs;