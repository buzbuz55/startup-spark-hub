import { MessageSquare, Video, Users, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')] bg-cover bg-center opacity-10" />
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-32 text-center">
        <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 md:mb-6 animate-fade-in">
          Build Your Startup
          <span className="block text-purple-300">With Your Squad</span>
        </h1>
        <p className="text-lg md:text-2xl text-purple-100 mb-8 md:mb-12 max-w-3xl mx-auto px-4">
          The ultimate platform for young entrepreneurs to collaborate, build, and launch their next big idea. Connect with VCs, get feedback, and ship fast! 🚀
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
          <Link to="/submit-idea" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-white text-purple-700 hover:bg-purple-100">
              Submit Your Idea
            </Button>
          </Link>
          <Link to="/talent-pool" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-white text-purple-700 hover:bg-purple-100">
              Join Talent Pool
            </Button>
          </Link>
        </div>
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto px-4">
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
    <div className="flex flex-col items-center text-white p-2">
      <div className="p-3 md:p-4 rounded-full bg-white/10 mb-2 md:mb-3">
        <Icon className="w-5 h-5 md:w-6 md:h-6" />
      </div>
      <span className="text-xs md:text-sm font-medium">{text}</span>
    </div>
  );
};

export default Hero;