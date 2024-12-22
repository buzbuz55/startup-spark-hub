import { Button } from "@/components/ui/button";
import { Briefcase, GraduationCap, Code } from "lucide-react";
import { Link } from "react-router-dom";

const OpportunityCards = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      <div className="bg-gradient-to-br from-purple-100 to-white p-6 rounded-lg">
        <Briefcase className="w-12 h-12 text-purple-600 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Full-time Positions</h2>
        <p className="text-gray-600 mb-4">Join innovative startups and make an impact</p>
        <Link to="/vc-dashboard">
          <Button variant="outline" className="w-full">
            View Positions
          </Button>
        </Link>
      </div>

      <div className="bg-gradient-to-br from-blue-100 to-white p-6 rounded-lg">
        <GraduationCap className="w-12 h-12 text-blue-600 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Internships</h2>
        <p className="text-gray-600 mb-4">Gain valuable experience in startups</p>
        <Link to="/submit-idea">
          <Button variant="outline" className="w-full">
            Find Internships
          </Button>
        </Link>
      </div>

      <div className="bg-gradient-to-br from-green-100 to-white p-6 rounded-lg">
        <Code className="w-12 h-12 text-green-600 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Freelance Projects</h2>
        <p className="text-gray-600 mb-4">Work on exciting freelance opportunities</p>
        <Link to="/messages">
          <Button variant="outline" className="w-full">
            Browse Projects
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OpportunityCards;