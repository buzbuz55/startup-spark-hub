import { MessageSquare, Video, ChartBarIcon, Users, Rocket, Globe, School, Share2, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const Features = () => {
  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Launch Your Dreams to the Moon! 🚀
        </h2>
        <p className="text-xl text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Connect, collaborate, and conquer with fellow student entrepreneurs from top universities worldwide
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow group hover:-translate-y-1 duration-300">
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <feature.icon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: MessageSquare,
    title: "Real-time Chat",
    description: "Connect instantly with team members through rich messaging, file sharing, and threaded discussions.",
  },
  {
    icon: Video,
    title: "Video Collaboration",
    description: "Jump into HD video calls for brainstorming sessions, pitch practice, and team meetings.",
  },
  {
    icon: Users,
    title: "Team Sync",
    description: "Build your dream team with talented students from universities worldwide.",
  },
  {
    icon: School,
    title: "Campus Network",
    description: "Connect with entrepreneurship clubs and incubators from top universities globally.",
  },
  {
    icon: Share2,
    title: "Resource Sharing",
    description: "Share pitch decks, prototypes, and get instant feedback from mentors and peers.",
  },
  {
    icon: Zap,
    title: "Quick Deploy",
    description: "Launch your MVP in minutes with our integrated development and deployment tools.",
  },
];

export default Features;