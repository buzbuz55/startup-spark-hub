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
    name: "NeuralFinance AI",
    category: "AI Finance",
    description: "Using advanced machine learning to democratize investment strategies. Our AI analyzes market patterns and provides institutional-grade insights to retail investors.",
    seeking: ["ML Engineers", "Quant Analysts", "Full-Stack Developers"],
    funding: "$15.5M",
    impact: "Serving 50,000+ active users",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    iconName: "Brain"
  }
];