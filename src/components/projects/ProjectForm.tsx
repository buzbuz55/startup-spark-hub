import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";

const ProjectForm = () => {
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    requiredSkills: "",
    teamSize: "",
    projectStage: "",
    compensation: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Project created successfully!");
    setProjectData({
      title: "",
      description: "",
      requiredSkills: "",
      teamSize: "",
      projectStage: "",
      compensation: "",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-6">Create a New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Project Title</label>
          <Input
            value={projectData.title}
            onChange={(e) => setProjectData({...projectData, title: e.target.value})}
            placeholder="Enter project title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Project Description</label>
          <Textarea
            value={projectData.description}
            onChange={(e) => setProjectData({...projectData, description: e.target.value})}
            placeholder="Describe your project idea and goals"
            required
            className="min-h-[150px]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Required Skills</label>
          <Input
            value={projectData.requiredSkills}
            onChange={(e) => setProjectData({...projectData, requiredSkills: e.target.value})}
            placeholder="e.g., React, Node.js, Marketing"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Team Size</label>
          <Input
            value={projectData.teamSize}
            onChange={(e) => setProjectData({...projectData, teamSize: e.target.value})}
            placeholder="How many team members are you looking for?"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Project Stage</label>
          <Input
            value={projectData.projectStage}
            onChange={(e) => setProjectData({...projectData, projectStage: e.target.value})}
            placeholder="e.g., Idea, MVP, Beta"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Compensation</label>
          <Input
            value={projectData.compensation}
            onChange={(e) => setProjectData({...projectData, compensation: e.target.value})}
            placeholder="e.g., Equity, Revenue Share, Paid Position"
            required
          />
        </div>
        <Button type="submit" className="w-full">Create Project</Button>
      </form>
    </div>
  );
};

export default ProjectForm;