import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Leaf, Wind, Droplet, Trees, Waves, Globe, Sun, Zap, Cloud, Rocket,
  Building, Car, Factory, Brain, Cpu, Plane, Battery, Fan, Truck,
  Recycle, Container, Bot, Anchor, Car as CarIcon, Building2
} from "lucide-react";
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
    },
    {
      id: 11,
      name: "AtmosTech Solutions 🌬️",
      category: "Carbon Capture",
      description: "Solar-powered atmospheric scrubbers and AI-driven carbon capture systems transforming CO₂ into biodegradable materials. Our carbon-capturing concrete helps cities offset emissions while cleaning the air.",
      seeking: ["Environmental Engineers", "AI Specialists", "Material Scientists"],
      funding: "$8.5M",
      impact: "Removing 100,000 tons of CO₂ annually",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
      icon: <Factory className="w-8 h-8 text-gray-600" />
    },
    {
      id: 12,
      name: "Helios Innovations ☀️",
      category: "Solar & Space Energy",
      description: "Revolutionary space-based solar farms beaming clean energy to Earth, combined with AI-powered climate prediction systems. Our solar-integrated roof tiles and transparent windows make energy production seamless.",
      seeking: ["Aerospace Engineers", "Solar Specialists", "AI Researchers"],
      funding: "$12.2M",
      impact: "Powering 250,000 homes with space solar",
      image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f",
      icon: <Sun className="w-8 h-8 text-yellow-500" />
    },
    {
      id: 13,
      name: "Hydrogen Horizon 🚗",
      category: "Clean Transport",
      description: "Leading the revolution in hydrogen-powered autonomous vehicles, from cars to cargo ships. Building the future of clean transport with AI-driven hydrogen refueling networks.",
      seeking: ["Automotive Engineers", "Hydrogen Specialists", "AI Developers"],
      funding: "$15.8M",
      impact: "Zero-emission transport network spanning 50 cities",
      image: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
      icon: <Car className="w-8 h-8 text-blue-500" />
    },
    {
      id: 14,
      name: "CleanTech BioFabricators 🧬",
      category: "Bioengineering",
      description: "Pioneering artificial photosynthesis and microbial carbon capture technologies. Our genetically modified plants and algae-based air purifiers are transforming urban environments.",
      seeking: ["Bioengineers", "Geneticists", "Environmental Scientists"],
      funding: "$9.3M",
      impact: "Enhanced CO₂ capture in 30 major cities",
      image: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
      icon: <Brain className="w-8 h-8 text-green-600" />
    },
    {
      id: 15,
      name: "EcoSphere Cities 🌆",
      category: "Smart Cities",
      description: "Building carbon-neutral megacities with integrated smart grids, vertical farms, and AI-managed sustainable buildings. Creating the blueprint for future urban living.",
      seeking: ["Urban Planners", "Sustainability Experts", "Smart Grid Engineers"],
      funding: "$25.1M",
      impact: "First carbon-neutral city of 1M residents",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
      icon: <Building className="w-8 h-8 text-purple-500" />
    },
    {
      id: 16,
      name: "AeroClean Tech ✈️",
      category: "Clean Aviation",
      description: "Revolutionizing aviation with hydrogen-powered aircraft and pollution-capturing drone swarms. Making air travel clean while cleaning the air we breathe.",
      seeking: ["Aerospace Engineers", "Drone Specialists", "Clean Energy Experts"],
      funding: "$18.7M",
      impact: "50% reduction in aviation emissions",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      icon: <Plane className="w-8 h-8 text-sky-500" />
    },
    {
      id: 17,
      name: "Nexus Energy Solutions ⚡",
      category: "Energy Storage",
      description: "Creating AI-driven energy storage systems and smart grid management solutions. Our floating solar farms and wind islands are revolutionizing renewable energy generation.",
      seeking: ["Energy Systems Engineers", "AI Specialists", "Grid Architects"],
      funding: "$14.5M",
      impact: "1GW clean energy storage deployed",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      icon: <Battery className="w-8 h-8 text-green-500" />
    },
    {
      id: 18,
      name: "AirClean Networks 💨",
      category: "Air Purification",
      description: "Deploying smart air-purifying streetlights and bioengineered air-cleaning grasslands. Our pollution-eating robots are making cities breathable again.",
      seeking: ["Environmental Engineers", "Robotics Specialists", "Urban Planners"],
      funding: "$11.2M",
      impact: "Air quality improved for 10M+ people",
      image: "https://images.unsplash.com/photo-1439886183900-e79ec0057170",
      icon: <Fan className="w-8 h-8 text-blue-400" />
    },
    {
      id: 19,
      name: "Green Freight Alliance 🚛",
      category: "Clean Logistics",
      description: "Operating zero-emission hydrogen freight networks and hyperloop cargo systems. Transforming global logistics with sustainable transportation solutions.",
      seeking: ["Logistics Engineers", "Hydrogen Specialists", "Network Planners"],
      funding: "$20.3M",
      impact: "Carbon-neutral shipping across 3 continents",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      icon: <Truck className="w-8 h-8 text-green-600" />
    },
    {
      id: 20,
      name: "TerraCycle Innovations ♻️",
      category: "Waste Management",
      description: "Revolutionary AI-driven waste-to-energy systems converting municipal waste into clean energy. Transforming plastic waste into biofuel and recyclable materials.",
      seeking: ["Waste Management Experts", "Chemical Engineers", "AI Developers"],
      funding: "$16.8M",
      impact: "1M tons of waste converted to energy",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      icon: <Recycle className="w-8 h-8 text-green-500" />
    },
    {
      id: 21,
      name: "CleanWater Tech 💧",
      category: "Water Solutions",
      description: "Developing solar-powered desalination plants and AI-managed water-efficient agriculture systems. Bringing clean water to communities worldwide.",
      seeking: ["Water Treatment Engineers", "Solar Specialists", "AI Experts"],
      funding: "$13.4M",
      impact: "Clean water for 2M+ people",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      icon: <Container className="w-8 h-8 text-blue-500" />
    },
    {
      id: 22,
      name: "TerraFarm Robotics 🤖",
      category: "Smart Agriculture",
      description: "AI-powered autonomous farming systems using drones and robots for efficient, sustainable agriculture. Revolutionizing farming with minimal environmental impact.",
      seeking: ["Robotics Engineers", "Agricultural Scientists", "AI Specialists"],
      funding: "$10.9M",
      impact: "90% reduction in water usage",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      icon: <Robot className="w-8 h-8 text-orange-500" />
    },
    {
      id: 23,
      name: "Ocean Guardians 🌊",
      category: "Marine Conservation",
      description: "Deploying ocean plastic-eating robots and AI-driven cleanup platforms. Creating floating carbon capture cities for marine conservation.",
      seeking: ["Marine Biologists", "Robotics Engineers", "Ocean Scientists"],
      funding: "$19.2M",
      impact: "Cleaned 1M tons of ocean plastic",
      image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
      icon: <Anchor className="w-8 h-8 text-blue-600" />
    },
    {
      id: 24,
      name: "EcoRover Transport 🚙",
      category: "Electric Mobility",
      description: "Building a global network of autonomous electric vehicles with AI-powered transport management systems. Creating the future of urban mobility.",
      seeking: ["Automotive Engineers", "AI Developers", "Transport Planners"],
      funding: "$22.5M",
      impact: "100K+ EVs in smart transport network",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      icon: <CarIcon className="w-8 h-8 text-purple-500" />
    },
    {
      id: 25,
      name: "Smart Urban GreenTech 🌱",
      category: "Urban Innovation",
      description: "Implementing vertical forests and AI-managed green spaces in cities. Pioneering microbial carbon capture roads and intelligent traffic systems.",
      seeking: ["Urban Planners", "Environmental Engineers", "AI Specialists"],
      funding: "$17.6M",
      impact: "Created 50+ carbon-negative districts",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
      icon: <Building2 className="w-8 h-8 text-green-600" />
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