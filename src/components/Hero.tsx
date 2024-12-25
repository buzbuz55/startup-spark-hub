import { MessageSquare, Users, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const isMobile = useIsMobile();

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 to-indigo-900">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')] bg-cover bg-center opacity-5" />
      <div className="relative z-10 container mx-auto px-4 py-16 text-center max-w-5xl">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in leading-tight">
          Launch Your Startup
          <span className="block text-purple-200 mt-2">Find Your Dream Team</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
          Connect with co-founders, build your MVP, and get funded. Start your journey today! 🚀
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link to="/submit-idea" className="w-full sm:w-auto">
            <Button size={isMobile ? "default" : "lg"} className="w-full sm:w-auto bg-white text-purple-900 hover:bg-purple-50 font-semibold">
              Share Your Idea
            </Button>
          </Link>
          <Link to="/talent-pool" className="w-full sm:w-auto">
            <Button size={isMobile ? "default" : "lg"} variant="outline" className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/10">
              Join as Co-Founder
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          <FeatureIcon icon={MessageSquare} text="Chat" />
          <FeatureIcon icon={Users} text="Team Up" />
          <FeatureIcon icon={Rocket} text="Launch" />
        </div>
      </div>
    </div>
  );
};

const FeatureIcon = ({ icon: Icon, text }: { icon: any; text: string }) => {
  return (
    <div className="flex flex-col items-center text-white p-3 backdrop-blur-sm bg-white/10 rounded-xl hover:bg-white/20 transition-all">
      <div className="p-2 md:p-3 rounded-full bg-white/20 mb-2">
        <Icon className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <span className="text-sm md:text-base font-medium">{text}</span>
    </div>
  );
};

export default Hero;