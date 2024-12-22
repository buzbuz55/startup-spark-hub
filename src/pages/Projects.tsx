import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf, Wind, Droplet, Trees, Waves, Globe, Sun, Zap, Cloud, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: "EcoVolt ⚡",
      category: "Green Energy",
      description: "Revolutionary solar and wind energy storage solutions inspired by nature's own energy cycles. Our biomimetic batteries mimic how trees store energy, making renewable power accessible 24/7.",
      seeking: ["Solar Engineers", "Battery Specialists", "Software Developers"],
      funding: "$2.5M",
      impact: "Reducing carbon emissions by 50,000 tons annually",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      icon: <Sun className="w-8 h-8 text-yellow-500" />
    },
    {
      id: 2,
      name: "AirGuardian 🌬️",
      category: "Clean Air",
      description: "AI-powered air purification systems that learn from forest ecosystems. Our technology mimics how trees naturally filter air, bringing forest-fresh air to urban spaces.",
      seeking: ["AI Engineers", "Environmental Scientists", "Hardware Designers"],
      funding: "$1.8M",
      impact: "Improving air quality for 1M+ city residents",
      image: "https://images.unsplash.com/photo-1439337153520-7082a56a81f4",
      icon: <Wind className="w-8 h-8 text-blue-400" />
    },
    {
      id: 3,
      name: "AquaPure 💧",
      category: "Clean Water",
      description: "Innovative water filtration technology inspired by mangrove roots. Our systems bring clean water to developing nations using nature's time-tested filtration methods.",
      seeking: ["Water Engineers", "Project Managers", "Community Liaisons"],
      funding: "$3.2M",
      impact: "Providing clean water to 500,000 people",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      icon: <Droplet className="w-8 h-8 text-blue-500" />
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
      icon: <Trees className="w-8 h-8 text-green-600" />
    },
    {
      id: 5,
      name: "CoastalCare 🏖️",
      category: "Save Our Beaches",
      description: "Automated beach cleaning robots powered by AI, combining ocean plastic collection with innovative recycling technology to protect marine ecosystems.",
      seeking: ["Robotics Engineers", "Marine Biologists", "Recycling Specialists"],
      funding: "$2.1M",
      impact: "Cleaning 1000+ miles of coastline",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
      icon: <Waves className="w-8 h-8 text-blue-300" />
    },
    {
      id: 6,
      name: "EarthDAO 🌍",
      category: "Save the Planet",
      description: "Blockchain-based platform democratizing environmental project funding. Making it easy for anyone to contribute to and track the impact of global conservation efforts.",
      seeking: ["Blockchain Developers", "Environmental Experts", "Financial Analysts"],
      funding: "$4.5M",
      impact: "Funded 100+ environmental projects",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
      icon: <Globe className="w-8 h-8 text-green-400" />
    },
    {
      id: 7,
      name: "WaveEnergy 🌊",
      category: "Green Energy",
      description: "Revolutionary ocean wave power technology bringing sustainable energy to coastal communities while preserving marine ecosystems.",
      seeking: ["Marine Engineers", "Energy Systems Specialists", "Project Managers"],
      funding: "$3.8M",
      impact: "Powering 50,000 coastal homes",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      icon: <Zap className="w-8 h-8 text-blue-500" />
    },
    {
      id: 8,
      name: "BioHarvest 🌱",
      category: "Sustainable Agriculture",
      description: "Vertical farming solutions combining AI and hydroponics to revolutionize urban food production with 90% less water usage.",
      seeking: ["Agricultural Engineers", "AI Specialists", "Botanists"],
      funding: "$2.9M",
      impact: "90% less water usage in farming",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      icon: <Leaf className="w-8 h-8 text-green-500" />
    },
    {
      id: 9,
      name: "CloudForest ☁️",
      category: "Climate Action",
      description: "Cloud seeding technology that helps restore natural rain patterns in drought-affected regions while monitoring atmospheric health.",
      seeking: ["Atmospheric Scientists", "Data Analysts", "Climate Researchers"],
      funding: "$2.3M",
      impact: "Restored rainfall in 5 regions",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
      icon: <Cloud className="w-8 h-8 text-gray-400" />
    },
    {
      id: 10,
      name: "SpaceGuardian 🚀",
      category: "Space Sustainability",
      description: "Innovative satellite technology for monitoring Earth's health from space, providing real-time data on climate change and environmental threats.",
      seeking: ["Aerospace Engineers", "Satellite Specialists", "Data Scientists"],
      funding: "$5.1M",
      impact: "24/7 global environmental monitoring",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
      icon: <Rocket className="w-8 h-8 text-purple-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Environmental Impact Startups</h1>
          <p className="text-xl text-gray-600">Join these innovative startups making a difference for our planet</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden rounded-t-lg">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{project.name}</span>
                  <Badge variant="secondary">{project.category}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{project.description}</p>
                
                <div>
                  <h4 className="font-semibold mb-2">Seeking:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.seeking.map((role, idx) => (
                      <Badge key={idx} variant="outline">{role}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <div className="text-sm">
                    <span className="font-semibold">Funding Raised:</span>
                    <span className="text-green-600 ml-2">{project.funding}</span>
                  </div>
                  <Link to="/submit-idea">
                    <Button variant="default">Join Project</Button>
                  </Link>
                </div>

                <div className="text-sm text-gray-600 mt-2">
                  <span className="font-semibold">Impact:</span>
                  <span className="ml-2">{project.impact}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;