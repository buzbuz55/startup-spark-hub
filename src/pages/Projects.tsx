import Header from "@/components/Header";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectFilters from "@/components/projects/ProjectFilters";
import { useState } from "react";
import { projectsData } from "@/data/projectsData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LanguageSelector from "@/components/LanguageSelector";
import { LogIn, UserPlus } from "lucide-react";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projectsData.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                StartupSparkHub
              </span>
            </Link>

            {/* Right side items */}
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <Link to="/login">
                <Button variant="ghost" size="sm" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="default" size="sm" className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

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
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;