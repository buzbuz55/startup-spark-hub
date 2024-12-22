import { MessageSquare, Video, Users, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')] bg-cover bg-center opacity-10" />
      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          Build Your Startup
          <span className="block text-purple-300">With Your Squad</span>
        </h1>
        <p className="text-xl md:text-2xl text-purple-100 mb-12 max-w-3xl mx-auto">
          The ultimate platform for young entrepreneurs to collaborate, build, and launch their next big idea. Connect with VCs, get feedback, and ship fast! 🚀
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/submit-idea">
            <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-100">
              Submit Your Idea
            </Button>
          </Link>
          <Link to="/talent-pool">
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Join Talent Pool
            </Button>
          </Link>
        </div>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          <FeatureIcon icon={MessageSquare} text="Real-time Chat" />
          <FeatureIcon icon={Video} text="Video Calls" />
          <FeatureIcon icon={Users} text="Collaboration" />
          <FeatureIcon icon={Rocket} text="Quick Deploy" />
        </div>
      </div>
    </div>
  );
};

const FeatureIcon = ({ icon: Icon, text }: { icon: any; text: string }) => {
  return (
    <div className="flex flex-col items-center text-white">
      <div className="p-4 rounded-full bg-white/10 mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};

export default Hero;