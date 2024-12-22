import { MessageSquare, Video, Users, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')] bg-cover bg-center opacity-10" />
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16 text-center">
        <h1 className="text-3xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
          Launch Your Startup
          <span className="block text-purple-200 mt-2">Find Your Dream Team</span>
        </h1>
        <p className="text-base md:text-xl text-purple-100 mb-8 max-w-2xl mx-auto px-4">
          Connect with co-founders, build your MVP, and get funded. Start your entrepreneurial journey today! 🚀
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 mb-12">
          <Link to="/submit-idea" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-white text-purple-700 hover:bg-purple-100 font-semibold">
              Share Your Idea
            </Button>
          </Link>
          <Link to="/talent-pool" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/10">
              Join as Co-Founder
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <FeatureIcon icon={MessageSquare} text="Instant Chat" />
          <FeatureIcon icon={Video} text="Video Pitch" />
          <FeatureIcon icon={Users} text="Team Building" />
          <FeatureIcon icon={Rocket} text="Fast Launch" />
        </div>
      </div>
    </div>
  );
};

const FeatureIcon = ({ icon: Icon, text }: { icon: any; text: string }) => {
  return (
    <div className="flex flex-col items-center text-white p-2 backdrop-blur-sm bg-white/5 rounded-lg">
      <div className="p-2 md:p-3 rounded-full bg-white/10 mb-2">
        <Icon className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <span className="text-xs md:text-sm font-medium">{text}</span>
    </div>
  );
};

export default Hero;