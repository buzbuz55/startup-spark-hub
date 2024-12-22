import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf, Wind, Droplet, Tree, Waves, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: "EcoVolt",
      category: "Green Energy",
      description: "Revolutionary solar and wind energy storage solutions for residential areas",
      seeking: ["Solar Engineers", "Battery Specialists", "Software Developers"],
      funding: "$2.5M",
      impact: "Reducing carbon emissions by 50,000 tons annually",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
    },
    {
      id: 2,
      name: "AirGuardian",
      category: "Clean Air",
      description: "AI-powered air purification systems for urban environments",
      seeking: ["AI Engineers", "Environmental Scientists", "Hardware Designers"],
      funding: "$1.8M",
      impact: "Improving air quality for 1M+ city residents",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    },
    {
      id: 3,
      name: "AquaPure",
      category: "Clean Water",
      description: "Innovative water filtration technology for developing nations",
      seeking: ["Water Engineers", "Project Managers", "Community Liaisons"],
      funding: "$3.2M",
      impact: "Providing clean water to 500,000 people",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716"
    },
    {
      id: 4,
      name: "ForestGuard",
      category: "Save the Trees",
      description: "Drone-based reforestation and forest monitoring system",
      seeking: ["Drone Operators", "Forest Engineers", "Data Scientists"],
      funding: "$1.5M",
      impact: "Planting 1M trees by 2024",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9"
    },
    {
      id: 5,
      name: "CoastalCare",
      category: "Save Our Beaches",
      description: "Automated beach cleaning robots and plastic waste recycling",
      seeking: ["Robotics Engineers", "Marine Biologists", "Recycling Specialists"],
      funding: "$2.1M",
      impact: "Cleaning 1000+ miles of coastline",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716"
    },
    {
      id: 6,
      name: "EarthDAO",
      category: "Save the Planet",
      description: "Blockchain-based platform for funding environmental projects",
      seeking: ["Blockchain Developers", "Environmental Experts", "Financial Analysts"],
      funding: "$4.5M",
      impact: "Funded 100+ environmental projects",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843"
    },
    {
      id: 7,
      name: "WaveEnergy",
      category: "Green Energy",
      description: "Harnessing ocean wave power for coastal communities",
      seeking: ["Marine Engineers", "Energy Systems Specialists", "Project Managers"],
      funding: "$3.8M",
      impact: "Powering 50,000 coastal homes",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    {
      id: 8,
      name: "BioHarvest",
      category: "Sustainable Agriculture",
      description: "Vertical farming solutions using AI and hydroponics",
      seeking: ["Agricultural Engineers", "AI Specialists", "Botanists"],
      funding: "$2.9M",
      impact: "90% less water usage in farming",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    },
    {
      id: 9,
      name: "RecycleTech",
      category: "Waste Management",
      description: "Smart recycling systems with AI sorting technology",
      seeking: ["Recycling Specialists", "Machine Learning Engineers", "Hardware Designers"],
      funding: "$1.7M",
      impact: "Increased recycling efficiency by 300%",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
    },
    {
      id: 10,
      name: "GreenCommute",
      category: "Sustainable Transport",
      description: "Electric bike-sharing platform for urban areas",
      seeking: ["Mobile Developers", "Urban Planners", "Operations Managers"],
      funding: "$2.3M",
      impact: "Reduced urban carbon emissions by 25%",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334"
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