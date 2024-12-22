import { ProjectData } from "@/types/project";

export const environmentalProjects: ProjectData[] = [
  {
    id: 3,
    name: "AquaPure 💧",
    category: "Clean Water",
    description: "Innovative water filtration technology inspired by mangrove roots. Our systems bring clean water to developing nations using nature's time-tested filtration methods.",
    seeking: ["Water Engineers", "Project Managers", "Community Liaisons"],
    funding: "$3.2M",
    impact: "Providing clean water to 500,000 people",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    iconName: "Droplet"
  },
  {
    id: 4,
    name: "ForestGuard 🌳",
    category: "Save the Trees",
    description: "Drone-based reforestation and forest monitoring system using AI to identify optimal planting locations and track forest health in real-time.",
    seeking: ["Drone Operators", "Forest Engineers", "Data Scientists"],
    funding: "$1.5M",
    impact: "Planting 1M trees by 2024",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
    iconName: "Trees"
  }
];