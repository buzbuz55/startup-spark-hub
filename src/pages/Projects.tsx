
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectFilters from "@/components/projects/ProjectFilters";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import ProjectsLoading from "@/components/projects/ProjectsLoading";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { projectsData } from "@/data/projectsData";
import type { Project } from "@/components/projects/ProjectCard";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, [searchQuery]);

  const fetchProjects = async () => {
    try {
      let { data: dbProjects, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'active');

      if (error) {
        console.error('Error fetching from Supabase:', error);
        // Convert projectsData to match Project type
        const formattedProjects = projectsData.map(p => ({
          id: p.id,
          title: p.name,
          description: p.description,
          category: p.category,
          team_size: 5, // Default value
          stage: "Idea Stage",
          is_hiring: true,
          created_at: new Date().toISOString(),
          image: p.image,
          impact: p.impact,
          funding: p.funding,
          seeking: p.seeking
        }));
        
        const filteredProjects = formattedProjects.filter(project =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setProjects(filteredProjects);
      } else if (dbProjects && dbProjects.length > 0) {
        const filteredProjects = dbProjects.filter(project =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setProjects(filteredProjects);
      } else {
        // If no projects in database, use formatted projects data
        const formattedProjects = projectsData.map(p => ({
          id: p.id,
          title: p.name,
          description: p.description,
          category: p.category,
          team_size: 5, // Default value
          stage: "Idea Stage",
          is_hiring: true,
          created_at: new Date().toISOString(),
          image: p.image,
          impact: p.impact,
          funding: p.funding,
          seeking: p.seeking
        }));
        
        const filteredProjects = formattedProjects.filter(project =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setProjects(filteredProjects);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to fetch projects");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0D1117]">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 md:py-24">
        <ProjectFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {isLoading ? (
          <ProjectsLoading />
        ) : (
          <ProjectsGrid projects={projects} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
