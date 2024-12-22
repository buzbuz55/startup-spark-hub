import { Button } from "@/components/ui/button";
import { Briefcase, GraduationCap, Code } from "lucide-react";
import { Link } from "react-router-dom";

interface OpportunityCardsProps {
  onInternshipsClick: () => void;
}

const OpportunityCards = ({ onInternshipsClick }: OpportunityCardsProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-4 md:gap-6">
      <div className="bg-gradient-to-br from-purple-100 to-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
        <Briefcase className="w-10 h-10 text-purple-600 mb-4" />
        <h2 className="text-lg md:text-xl font-semibold mb-2">Hire Full-time Talent</h2>
        <p className="text-gray-600 mb-4 text-sm md:text-base">
          For companies looking to build their dream team
        </p>
        <Link to="/vc-dashboard">
          <Button variant="outline" className="w-full">
            Browse Candidates
          </Button>
        </Link>
      </div>

      <div className="bg-gradient-to-br from-blue-100 to-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
        <GraduationCap className="w-10 h-10 text-blue-600 mb-4" />
        <h2 className="text-lg md:text-xl font-semibold mb-2">Internships</h2>
        <p className="text-gray-600 mb-4 text-sm md:text-base">Gain valuable experience in startups</p>
        <Button variant="outline" className="w-full" onClick={onInternshipsClick}>
          Find Internships
        </Button>
      </div>

      <div className="bg-gradient-to-br from-green-100 to-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
        <Code className="w-10 h-10 text-green-600 mb-4" />
        <h2 className="text-lg md:text-xl font-semibold mb-2">Freelance Projects</h2>
        <p className="text-gray-600 mb-4 text-sm md:text-base">Work on exciting freelance opportunities</p>
        <Link to="/projects">
          <Button variant="outline" className="w-full">
            Browse Projects
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OpportunityCards;