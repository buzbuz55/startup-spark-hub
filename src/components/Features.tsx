import { MessageSquare, Video, ChartBarIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

const Features = () => {
  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          Everything You Need to Build Your Next Big Thing
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
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
    title: "Smart Collaboration",
    description: "Real-time chat, file sharing, and project management tools to keep your team in sync.",
  },
  {
    icon: Video,
    title: "Face-to-Face",
    description: "Jump on video calls instantly with your team to brainstorm and solve problems.",
  },
  {
    icon: ChartBarIcon,
    title: "Track Growth",
    description: "Monitor your startup's progress and get insights to make data-driven decisions.",
  },
];

export default Features;