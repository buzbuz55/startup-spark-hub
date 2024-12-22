import { Button } from "@/components/ui/button";
import { Briefcase, GraduationCap, Code } from "lucide-react";
import { Link } from "react-router-dom";

interface OpportunityCardsProps {
  onInternshipsClick: () => void;
}

const OpportunityCards = ({ onInternshipsClick }: OpportunityCardsProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-3">
      <div className="bg-gradient-to-br from-purple-100 to-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
        <Briefcase className="w-8 h-8 text-purple-600 mb-2" />
        <h2 className="text-lg font-semibold mb-1">Hire Full-time Talent</h2>
        <p className="text-gray-600 mb-3 text-sm">
          For companies looking to build their dream team
        </p>
        <Link to="/vc-dashboard">
          <Button variant="outline" className="w-full text-sm py-1">
            Browse Candidates
          </Button>
        </Link>
      </div>

      <div className="bg-gradient-to-br from-blue-100 to-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
        <GraduationCap className="w-8 h-8 text-blue-600 mb-2" />
        <h2 className="text-lg font-semibold mb-1">Internships</h2>
        <p className="text-gray-600 mb-3 text-sm">Gain valuable experience in startups</p>
        <Button variant="outline" className="w-full text-sm py-1" onClick={onInternshipsClick}>
          Find Internships
        </Button>
      </div>

      <div className="bg-gradient-to-br from-green-100 to-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
        <Code className="w-8 h-8 text-green-600 mb-2" />
        <h2 className="text-lg font-semibold mb-1">Freelance Projects</h2>
        <p className="text-gray-600 mb-3 text-sm">Work on exciting freelance opportunities</p>
        <Link to="/projects">
          <Button variant="outline" className="w-full text-sm py-1">
            Browse Projects
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OpportunityCards;