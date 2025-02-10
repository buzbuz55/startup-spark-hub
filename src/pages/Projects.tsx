
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectFilters from "@/components/projects/ProjectFilters";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import ProjectsLoading from "@/components/projects/ProjectsLoading";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
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
      let query = supabase
        .from('projects')
        .select('*')
        .eq('status', 'active');

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      const { data: dbProjects, error } = await query;

      if (error) {
        console.error('Error fetching projects:', error);
        toast.error("Failed to fetch projects");
        return;
      }

      if (dbProjects) {
        const formattedProjects = dbProjects.map(p => ({
          id: p.id,
          title: p.title,
          description: p.description,
          category: p.category,
          team_size: p.team_size,
          stage: p.stage,
          is_hiring: p.is_hiring,
          created_at: p.created_at,
          created_by_username: p.created_by_username,
          website_url: p.website_url,
          image: p.image,
          location: p.location,
          collaboration_type: p.collaboration_type
        }));
        setProjects(formattedProjects);
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
