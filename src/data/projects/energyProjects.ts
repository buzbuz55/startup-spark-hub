import { ProjectData } from "@/types/project";

export const energyProjects: ProjectData[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "⚡ SolarFlow Energy Storage",
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
    name: "🚀 AeroMobile",
    category: "Flying Cars",
    description: "Developing electric vertical takeoff and landing (eVTOL) vehicles for urban air mobility. Revolutionizing personal transportation with autonomous flying vehicles.",
    seeking: ["Aerospace Engineers", "AI Specialists", "Safety Systems Engineers"],
    funding: "$12.8M",
    impact: "Zero-emission urban transportation",
    image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc",
    iconName: "Plane"
  },
  {
    id: "323e4567-e89b-12d3-a456-426614174002",
    name: "💸 QuantumPay",
    category: "Fintech",
    description: "Next-generation payment infrastructure using quantum-resistant cryptography. Making digital transactions faster, safer, and more accessible globally.",
    seeking: ["Cryptographers", "Blockchain Developers", "Financial Analysts"],
    funding: "$8.2M",
    impact: "Processing $1M daily transactions",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    iconName: "Wallet"
  }
];