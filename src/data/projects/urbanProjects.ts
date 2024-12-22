import { ProjectData } from "@/types/project";

export const urbanProjects: ProjectData[] = [
  {
    id: "623e4567-e89b-12d3-a456-426614174005",
    name: "VerticalFarm AI",
    category: "Urban Agriculture",
    description: "AI-controlled vertical farming systems for urban environments. Our technology enables sustainable food production in cities.",
    seeking: ["Agricultural Engineers", "AI Developers", "Plant Scientists"],
    funding: "$6.3M",
    impact: "Produces food for 5,000 families daily",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8",
    iconName: "Sprout"
  },
  {
    id: "723e4567-e89b-12d3-a456-426614174006",
    name: "SmartWaste Analytics",
    category: "Waste Management",
    description: "IoT-enabled waste management system that optimizes collection routes and increases recycling efficiency in cities.",
    seeking: ["IoT Engineers", "Data Analysts", "Waste Management Experts"],
    funding: "$3.5M",
    impact: "30% reduction in waste collection costs",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
    iconName: "Recycle"
  }
];