import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const Collaboration = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800 py-24 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Build Your Startup Empire</h2>
          <p className="text-xl mb-12 text-purple-100">
            Join thousands of student entrepreneurs building the next big thing
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <Users className="w-12 h-12 mb-4 mx-auto text-purple-300" />
              <h3 className="text-xl font-semibold mb-2">20K+ Students</h3>
              <p className="text-purple-200">From top universities worldwide</p>
            </div>
            
            <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <Rocket className="w-12 h-12 mb-4 mx-auto text-purple-300" />
              <h3 className="text-xl font-semibold mb-2">500+ Startups</h3>
              <p className="text-purple-200">Launched and growing</p>
            </div>
            
            <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <Trophy className="w-12 h-12 mb-4 mx-auto text-purple-300" />
              <h3 className="text-xl font-semibold mb-2">$2M+ Raised</h3>
              <p className="text-purple-200">By student founders</p>
            </div>
          </div>
          
          <Link to="/signup">
            <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-100 group">
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