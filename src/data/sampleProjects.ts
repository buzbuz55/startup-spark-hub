import { Project } from "@/components/projects/ProjectCard";

export const sampleProjects: Project[] = [
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
    created_by_username: "Quantum Team",
    website_url: "https://example.com"
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
    created_by_username: "Tech Innovators",
    website_url: "https://example.com"
  },
  // ... Add more sample projects here
];