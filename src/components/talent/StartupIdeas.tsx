import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Brain, Leaf, Heart, Globe, Bot, Shield, Sun, Zap, Cloud } from "lucide-react";

const startupIdeas = [
  {
    name: "EcoTrack",
    description: "AI-powered sustainability platform helping businesses track and reduce their carbon footprint",
    seeking: ["Full-stack Developer", "Data Scientist", "Sustainability Expert"],
    tech: ["Python", "React", "TensorFlow", "AWS"],
    icon: <Leaf className="w-8 h-8 text-green-500" />
  },
  {
    name: "HealthAI",
    description: "Personalized healthcare recommendations using machine learning and wearable data",
    seeking: ["ML Engineer", "Mobile Developer", "Healthcare Analyst"],
    tech: ["Python", "TensorFlow", "React Native", "AWS"],
    icon: <Heart className="w-8 h-8 text-red-500" />
  },
  {
    name: "GlobalLearn",
    description: "P2P language learning platform connecting native speakers worldwide",
    seeking: ["Frontend Developer", "UX Designer", "Growth Marketer"],
    tech: ["React", "Node.js", "WebRTC", "MongoDB"],
    icon: <Globe className="w-8 h-8 text-blue-500" />
  },
  {
    name: "RoboAssist",
    description: "Autonomous robot assistants for elderly care and home support",
    seeking: ["Robotics Engineer", "AI Developer", "Hardware Designer"],
    tech: ["ROS", "Python", "C++", "TensorFlow"],
    icon: <Bot className="w-8 h-8 text-purple-500" />
  },
  {
    name: "CyberShield",
    description: "AI-powered cybersecurity platform for small businesses",
    seeking: ["Security Engineer", "ML Developer", "Sales Engineer"],
    tech: ["Python", "Kubernetes", "TensorFlow", "React"],
    icon: <Shield className="w-8 h-8 text-indigo-500" />
  },
  {
    name: "SolarFlow",
    description: "Smart solar energy management system for residential properties",
    seeking: ["IoT Developer", "Frontend Engineer", "Energy Analyst"],
    tech: ["React", "Node.js", "IoT", "TensorFlow"],
    icon: <Sun className="w-8 h-8 text-yellow-500" />
  },
  {
    name: "BrainBoost",
    description: "Personalized learning platform using AI to optimize study patterns",
    seeking: ["ML Engineer", "Full-stack Developer", "Education Expert"],
    tech: ["Python", "React", "TensorFlow", "PostgreSQL"],
    icon: <Brain className="w-8 h-8 text-pink-500" />
  },
  {
    name: "QuickCharge",
    description: "Revolutionary fast-charging technology for electric vehicles",
    seeking: ["Hardware Engineer", "Embedded Systems Dev", "Power Systems Expert"],
    tech: ["C++", "Python", "Hardware Design", "IoT"],
    icon: <Zap className="w-8 h-8 text-yellow-500" />
  },
  {
    name: "CloudKitchen",
    description: "Cloud kitchen management platform with AI-powered demand prediction",
    seeking: ["Full-stack Developer", "Data Scientist", "Operations Expert"],
    tech: ["React", "Python", "TensorFlow", "AWS"],
    icon: <Cloud className="w-8 h-8 text-blue-400" />
  },
  {
    name: "SpaceVR",
    description: "Virtual space exploration and education platform",
    seeking: ["Unity Developer", "3D Artist", "Aerospace Engineer"],
    tech: ["Unity", "C#", "WebGL", "AR/VR"],
    icon: <Rocket className="w-8 h-8 text-purple-500" />
  }
];

const StartupIdeas = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {startupIdeas.map((startup, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center gap-4">
            {startup.icon}
            <div>
              <h3 className="text-xl font-bold">{startup.name}</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">{startup.description}</p>
            
            <div>
              <h4 className="font-semibold mb-2">Seeking:</h4>
              <div className="flex flex-wrap gap-2">
                {startup.seeking.map((role, idx) => (
                  <Badge key={idx} variant="secondary">{role}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Tech Stack:</h4>
              <div className="flex flex-wrap gap-2">
                {startup.tech.map((tech, idx) => (
                  <Badge key={idx} variant="outline">{tech}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StartupIdeas;