import { ProjectData } from "@/types/project";

export const environmentalProjects: ProjectData[] = [
  {
    id: "423e4567-e89b-12d3-a456-426614174003",
    name: "OceanClean Robotics",
    category: "Ocean Conservation",
    description: "Autonomous robots that collect and process ocean plastic waste. Our technology helps clean the oceans while recycling collected materials.",
    seeking: ["Robotics Engineers", "Marine Biologists", "Sustainability Experts"],
    funding: "$4.1M",
    impact: "Collected 500,000 kg of ocean plastic",
    image: "https://images.unsplash.com/photo-1484291470158-b8f8d608850d",
    iconName: "Waves"
  },
  {
    id: "523e4567-e89b-12d3-a456-426614174004",
    name: "ReForest Drones",
    category: "Reforestation",
    description: "Using drone technology and AI for rapid reforestation. Our system can plant thousands of trees per day in hard-to-reach areas.",
    seeking: ["Drone Operators", "Environmental Scientists", "AI Specialists"],
    funding: "$2.9M",
    impact: "Planted 1 million trees",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
    iconName: "Trees"
  }
];