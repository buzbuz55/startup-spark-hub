import { Briefcase, GraduationCap, Rocket } from "lucide-react";
import OpportunityCard from "./opportunity/OpportunityCard";

interface OpportunityCardsProps {
  onInternshipsClick: () => void;
}

const OpportunityCards = ({ onInternshipsClick }: OpportunityCardsProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
      <OpportunityCard
        title="Browse Companies"
        description="Explore innovative companies hiring talent"
        icon={Briefcase}
        iconColor="text-primary"
        gradientFrom="purple-100"
        buttonText="View Directory"
        linkTo="/companies"
      />

      <OpportunityCard
        title="Internships"
        description="Gain valuable experience in startups"
        icon={GraduationCap}
        iconColor="text-blue-600"
        gradientFrom="blue-100"
        buttonText="Find Internships"
        onClick={onInternshipsClick}
      />

      <OpportunityCard
        title="Startup Opportunities"
        description="Discover exciting startup opportunities"
        icon={Rocket}
        iconColor="text-green-600"
        gradientFrom="green-100"
        buttonText="View Opportunities"
        linkTo="/startup-opportunities"
      />
    </div>
  );
};

export default OpportunityCards;