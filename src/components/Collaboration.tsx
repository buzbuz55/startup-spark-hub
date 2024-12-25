import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const Collaboration = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800 py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Build Your Startup Empire</h2>
          <p className="text-xl mb-16 text-purple-100">
            Join thousands of student entrepreneurs building the next big thing
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="p-8 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/15 transition-all">
              <Users className="w-12 h-12 mb-6 mx-auto text-purple-300" />
              <h3 className="text-2xl font-semibold mb-3 text-white">20K+ Students</h3>
              <p className="text-purple-200">From top universities worldwide</p>
            </div>
            
            <div className="p-8 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/15 transition-all">
              <Rocket className="w-12 h-12 mb-6 mx-auto text-purple-300" />
              <h3 className="text-2xl font-semibold mb-3 text-white">500+ Startups</h3>
              <p className="text-purple-200">Launched and growing</p>
            </div>
            
            <div className="p-8 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/15 transition-all">
              <Trophy className="w-12 h-12 mb-6 mx-auto text-purple-300" />
              <h3 className="text-2xl font-semibold mb-3 text-white">$2M+ Raised</h3>
              <p className="text-purple-200">By student founders</p>
            </div>
          </div>
          
          <Link to="/signup">
            <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50 group px-8">
              Join the Movement
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Collaboration;