import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectFilters from "@/components/projects/ProjectFilters";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Sample projects data with carefully selected images and appropriate categories
const sampleProjects = [
  {
    id: "1",
    title: "QuantumCloud",
    description: "A cloud platform for quantum computing services, allowing businesses and developers to run quantum simulations and solve complex problems in AI, cryptography, and materials science.",
    category: "Tech",
    team_size: 5,
    stage: "Beta",
    location: "Global",
    collaboration_type: "Remote",
    is_hiring: true,
    created_at: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    created_by_username: "Quantum Team"
  },
  {
    id: "2",
    title: "AI-Fusion Chip",
    description: "Develop specialized AI chips for next-gen computing, improving AI processing speeds for devices, autonomous cars, and smart homes.",
    category: "Hardware",
    team_size: 8,
    stage: "Development",
    location: "Silicon Valley",
    collaboration_type: "Hybrid",
    is_hiring: true,
    created_at: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    created_by_username: "Tech Innovators"
  },
  {
    id: "3",
    title: "GreenCrypt",
    description: "A cryptocurrency that is mined through clean, renewable energy, integrating blockchain with eco-friendly mining farms.",
    category: "Crypto",
    team_size: 4,
    stage: "Early Access",
    location: "Global",
    collaboration_type: "Remote",
    is_hiring: true,
    created_at: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    created_by_username: "Green Miners"
  },
  {
    id: "4",
    title: "HydroHarvest",
    description: "A water purification system that uses renewable energy to desalinate ocean water for farming and drinking water purposes.",
    category: "CleanTech",
    team_size: 6,
    stage: "Prototype",
    location: "Coastal Regions",
    collaboration_type: "On-site",
    is_hiring: true,
    created_at: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    created_by_username: "Water Solutions"
  },
  {
    id: "5",
    title: "SmartMusic AI",
    description: "An AI-driven music generator that composes unique music tracks tailored to your preferences, ideal for content creators, streamers, and filmmakers.",
    category: "AI",
    team_size: 3,
    stage: "Beta",
    location: "Global",
    collaboration_type: "Remote",
    is_hiring: true,
    created_at: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    created_by_username: "AI Musicians"
  },
  {
    id: "6",
    title: "NeuroLinkWear",
    description: "A wearable device that uses brainwave signals to control smart home devices, laptops, and more with your mind.",
    category: "Hardware",
    team_size: 7,
    stage: "Prototype",
    location: "Global",
    collaboration_type: "Hybrid",
    is_hiring: true,
    created_at: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    created_by_username: "Neural Interface"
  },
  {
    id: "7",
    title: "AI-Cure",
    description: "AI-driven diagnostics and treatment recommendation software that helps doctors identify diseases faster and more accurately.",
    category: "Healthcare",
    team_size: 10,
    stage: "Testing",
    location: "Global",
    collaboration_type: "Remote",
    is_hiring: true,
    created_at: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    created_by_username: "Health AI"
  },
  {
    id: "8",
    title: "RoboFarm",
    description: "AI-driven robotic farming systems for efficient crop cultivation, harvesting, and maintenance using minimal resources.",
    category: "AgTech",
    team_size: 6,
    stage: "Pilot",
    location: "Rural",
    collaboration_type: "Hybrid",
    is_hiring: true,
    created_at: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    created_by_username: "Robo Farmers"
  },
  {
    id: "9",
    title: "WindGrid",
    description: "A decentralized network of small-scale wind turbines for residential or industrial use, connected to a local grid for eco-friendly power.",
    category: "Energy",
    team_size: 5,
    stage: "Deployment",
    location: "Windy Regions",
    collaboration_type: "On-site",
    is_hiring: true,
    created_at: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    created_by_username: "Wind Power"
  },
  {
    id: "10",
    title: "HealthChain",
    description: "A blockchain-based health records system that ensures patient privacy and streamlines data sharing among healthcare providers.",
    category: "Healthcare",
    team_size: 8,
    stage: "Beta",
    location: "Global",
    collaboration_type: "Remote",
    is_hiring: true,
    created_at: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    created_by_username: "Health Tech"
  },
  {
    id: "11",
    title: "NanoCleanTech",
    description: "Nanotechnology-based water filters that purify water at a molecular level, providing safe drinking water globally.",
    category: "CleanTech",
    team_size: 7,
    stage: "Research",
    location: "Global",
    collaboration_type: "Hybrid",
    is_hiring: true,
    created_at: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c",
    created_by_username: "Nano Solutions"
  },
  {
    id: "12",
    title: "AI-DeepDive",
    description: "AI-based analytics platform that performs deep learning on massive datasets to identify trends, patterns, and opportunities in business.",
    category: "AI",
    team_size: 6,
    stage: "Launch",
    location: "Global",
    collaboration_type: "Remote",
    is_hiring: true,
    created_at: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    created_by_username: "Deep Analytics"
  },
  {
    id: "13",
    title: "EcoBlock",
    description: "A construction material made from recycled plastic waste that can be used for building homes, reducing environmental impact.",
    category: "Construction",
    team_size: 4,
    stage: "Production",
    location: "Global",
    collaboration_type: "On-site",
    is_hiring: true,
    created_at: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    created_by_username: "Eco Builders"
  },
  {
    id: "14",
    title: "CarbonCatcher",
    description: "A carbon capture system that uses new filtration technology to reduce CO2 emissions from factories, turning the carbon into usable products.",
    category: "CleanTech",
    team_size: 9,
    stage: "Testing",
    location: "Industrial Zones",
    collaboration_type: "Hybrid",
    is_hiring: true,
    created_at: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    created_by_username: "Carbon Solutions"
  },
  {
    id: "15",
    title: "SmartWaste",
    description: "A smart waste management system that uses sensors and AI to optimize trash collection and recycling, reducing landfill waste.",
    category: "IoT",
    team_size: 5,
    stage: "Deployment",
    location: "Urban Areas",
    collaboration_type: "Hybrid",
    is_hiring: true,
    created_at: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    created_by_username: "Waste Innovation"
  }
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