import { Button } from "@/components/ui/button";
import { Briefcase, GraduationCap, Code, Minimize2 } from "lucide-react";
import { Link } from "react-router-dom";

interface OpportunityCardsProps {
  onInternshipsClick: () => void;
}

const OpportunityCards = ({ onInternshipsClick }: OpportunityCardsProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-3 max-w-4xl mx-auto">
      <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm hover:shadow-md transition-all text-center">
        <div className="flex justify-center mb-2">
          <Minimize2 className="w-5 h-5 text-purple-600" />
        </div>
        <h2 className="text-sm font-medium mb-1">Full-time Talent</h2>
        <Link to="/vc-dashboard">
          <Button variant="ghost" size="sm" className="w-full text-xs py-1">
            Browse
          </Button>
        </Link>
      </div>

      <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm hover:shadow-md transition-all text-center">
        <div className="flex justify-center mb-2">
          <Minimize2 className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-sm font-medium mb-1">Internships</h2>
        <Button variant="ghost" size="sm" className="w-full text-xs py-1" onClick={onInternshipsClick}>
          Browse
        </Button>
      </div>

      <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm hover:shadow-md transition-all text-center">
        <div className="flex justify-center mb-2">
          <Minimize2 className="w-5 h-5 text-green-600" />
        </div>
        <h2 className="text-sm font-medium mb-1">Freelance Projects</h2>
        <Link to="/projects">
          <Button variant="ghost" size="sm" className="w-full text-xs py-1">
            Browse
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OpportunityCards;