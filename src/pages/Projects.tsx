import Header from "@/components/Header";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectFilters from "@/components/projects/ProjectFilters";
import SubmitProjectDialog from "@/components/projects/SubmitProjectDialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { projectsData } from "@/data/projectsData";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);

  const filteredProjects = projectsData.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Environmental Impact Projects</h1>
            <p className="text-xl text-gray-600">Join innovative projects making a difference for our planet</p>
          </div>
          <Button 
            onClick={() => setIsSubmitDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            Submit Your Project
          </Button>
        </div>

        <ProjectFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={{
                id: project.id,
                title: project.name,
                description: project.description,
                category: project.category,
                team_size: 1,
                stage: "Development",
                location: "Global",
                collaboration_type: "Remote",
                is_hiring: true,
                created_at: new Date().toISOString(),
                created_by_username: "GreenTech",
                website_url: "https://example.com",
                image: project.image
              }} 
            />
          ))}
        </div>
      </div>

      <SubmitProjectDialog
        isOpen={isSubmitDialogOpen}
        onClose={() => setIsSubmitDialogOpen(false)}
      />
    </div>
  );
};

export default Projects;