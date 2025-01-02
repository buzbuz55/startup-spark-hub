import { Project } from "@/components/projects/ProjectCard";

export const sampleProjects: Project[] = [
  {
    id: "1",
    title: "QuantumCloud",
    description: "A cloud platform for quantum computing services, allowing businesses and developers to run quantum simulations and solve complex problems in AI, cryptography, and materials science.",
    category: "Tech",
    team_size: 5,
    stage: "Growth Stage",
    location: "Global",
    collaboration_type: "Remote",
    is_hiring: true,
    created_at: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    created_by_username: "Quantum Team",
    website_url: "https://example.com"
  },
  {
    id: "2",
    title: "AI-Fusion Chip",
    description: "Develop specialized AI chips for next-gen computing, improving AI processing speeds for devices, autonomous cars, and smart homes.",
    category: "Hardware",
    team_size: 8,
    stage: "MVP Stage",
    location: "Silicon Valley",
    collaboration_type: "Hybrid",
    is_hiring: true,
    created_at: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    created_by_username: "Tech Innovators",
    website_url: "https://example.com"
  },
  {
    id: "3",
    title: "EcoTrack",
    description: "Building a sustainable supply chain tracking platform using blockchain technology to ensure transparency and reduce environmental impact.",
    category: "Sustainability",
    team_size: 6,
    stage: "Idea Stage",
    location: "Europe",
    collaboration_type: "Remote",
    is_hiring: true,
    created_at: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    created_by_username: "Green Solutions",
    website_url: "https://example.com"
  },
  {
    id: "4",
    title: "HealthAI Assistant",
    description: "Developing an AI-powered health assistant that provides personalized medical advice and monitoring through wearable integration.",
    category: "Healthcare",
    team_size: 7,
    stage: "Growth Stage",
    location: "Boston",
    collaboration_type: "Hybrid",
    is_hiring: true,
    created_at: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    created_by_username: "Health Tech Labs",
    website_url: "https://example.com"
  },
  {
    id: "5",
    title: "CryptoSecure",
    description: "Building next-generation cryptocurrency security solutions using advanced encryption and biometric authentication.",
    category: "Fintech",
    team_size: 4,
    stage: "MVP Stage",
    location: "Singapore",
    collaboration_type: "Remote",
    is_hiring: true,
    created_at: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    created_by_username: "Crypto Solutions",
    website_url: "https://example.com"
  }
];