import { ProjectData } from "@/types/project";

export const energyProjects: ProjectData[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "SolarFlow Energy Storage",
    category: "Green Energy",
    description: "Revolutionary solar energy storage solutions using advanced battery technology. Our system enables 24/7 renewable power access for homes and businesses.",
    seeking: ["Battery Engineers", "Software Developers", "Project Managers"],
    funding: "$2.5M",
    impact: "Reducing carbon emissions by 50,000 tons annually",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276",
    iconName: "Sun"
  },
  {
    id: "223e4567-e89b-12d3-a456-426614174001",
    name: "WindHarvest Technologies",
    category: "Renewable Energy",
    description: "Innovative vertical wind turbines designed for urban environments. Our compact turbines generate clean energy while minimizing space requirements.",
    seeking: ["Mechanical Engineers", "Urban Planners", "Sales Specialists"],
    funding: "$3.8M",
    impact: "Powering 10,000 urban homes with clean energy",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51",
    iconName: "Wind"
  },
  {
    id: "323e4567-e89b-12d3-a456-426614174002",
    name: "GreenGrid Solutions",
    category: "Smart Grid",
    description: "AI-powered smart grid management platform that optimizes renewable energy distribution and reduces waste in power networks.",
    seeking: ["AI Engineers", "Grid Specialists", "Data Scientists"],
    funding: "$5.2M",
    impact: "15% improvement in grid efficiency",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e",
    iconName: "Network"
  }
];