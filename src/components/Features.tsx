import { MessageSquare, Video, Users, Rocket, Globe, School } from "lucide-react";
import { Card } from "@/components/ui/card";

const Features = () => {
  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Build Your Startup Fast 🚀
        </h2>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto px-6">
          Everything you need to transform your idea into a successful startup
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-sm md:max-w-none mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-2xl bg-purple-100 flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <feature.icon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: Rocket,
    title: "Quick Start",
    description: "Submit your idea and get matched with potential co-founders within days.",
  },
  {
    icon: Users,
    title: "Team Building",
    description: "Find skilled co-founders who share your vision and complement your skills.",
  },
  {
    icon: Video,
    title: "Video Pitch",
    description: "Present your idea through video calls and get instant feedback.",
  },
  {
    icon: MessageSquare,
    title: "Direct Chat",
    description: "Connect and communicate with potential team members in real-time.",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Access a worldwide community of entrepreneurs and innovators.",
  },
  {
    icon: School,
    title: "Startup Resources",
    description: "Get access to guides, templates, and tools to build your startup.",
  },
];

export default Features;