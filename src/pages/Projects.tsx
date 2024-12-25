import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectFilters from "@/components/projects/ProjectFilters";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Sample projects data
const sampleProjects = [
  {
    id: "1",
    title: "QuantumCloud",
    description: "A cloud platform for quantum computing services, allowing businesses and developers to run quantum simulations and solve complex problems in AI, cryptography, and materials science.",
    category: "Tech",
    team_size: 5,
    stage: "mvp",
    location: "Global",
    collaboration_type: "Remote",
    is_hiring: true,
    created_at: new Date().toISOString(),
  },
  // ... Add all 50 projects following the same structure
  {
    id: "2",
    title: "AI-Fusion Chip",
    description: "Develop specialized AI chips for next-gen computing, improving AI processing speeds for devices, autonomous cars, and smart homes.",
    category: "Tech",
    team_size: 4,
    stage: "growth",
    location: "Global",
    collaboration_type: "Hybrid",
    is_hiring: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "GreenCrypt",
    description: "A cryptocurrency that is mined through clean, renewable energy, integrating blockchain with eco-friendly mining farms.",
    category: "Crypto",
    team_size: 3,
    stage: "idea",
    location: "Global",
    collaboration_type: "Remote",
    is_hiring: true,
    created_at: new Date().toISOString(),
  },
  // ... Continue with all 50 projects
];

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, [searchQuery]);

  const fetchProjects = async () => {
    try {
      // First try to fetch from Supabase
      let { data: dbProjects, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'active');

      if (error) {
        console.error('Error fetching from Supabase:', error);
        // If Supabase fetch fails, use sample projects
        const filteredProjects = sampleProjects.filter(project =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setProjects(filteredProjects);
      } else if (dbProjects && dbProjects.length > 0) {
        // If we have database projects, filter them
        const filteredProjects = dbProjects.filter(project =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setProjects(filteredProjects);
      } else {
        // If no database projects, use sample projects
        const filteredProjects = sampleProjects.filter(project =>
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 md:py-24">
        <ProjectFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Projects;