import Header from "@/components/Header";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectFilters from "@/components/projects/ProjectFilters";
import { useState } from "react";
import { projectsData } from "@/data/projectsData";
import type { Project } from "@/components/projects/ProjectCard";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const projects: Project[] = projectsData.map(project => ({
    id: project.id.toString(),
    title: project.name,
    description: project.description,
    category: project.category,
    team_size: 1,
    stage: "MVP",
    created_at: new Date().toISOString(),
    is_hiring: true
  }));

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Environmental Impact Projects</h1>
          <p className="text-xl text-gray-600">Join innovative projects making a difference for our planet</p>
        </div>

        <ProjectFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;