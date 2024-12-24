import { Briefcase, GraduationCap, Code } from "lucide-react";
import OpportunityCard from "./opportunity/OpportunityCard";

interface OpportunityCardsProps {
  onInternshipsClick: () => void;
}

const OpportunityCards = ({ onInternshipsClick }: OpportunityCardsProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-3 max-w-4xl mx-auto">
      <OpportunityCard
        title="Hire Full-time Talent"
        description="For companies looking to build their dream team"
        icon={Briefcase}
        iconColor="text-purple-600"
        gradientFrom="purple-100"
        buttonText="Browse Candidates"
        linkTo="/vc-dashboard"
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
        title="Freelance Projects"
        description="Work on exciting freelance opportunities"
        icon={Code}
        iconColor="text-green-600"
        gradientFrom="green-100"
        buttonText="Browse Projects"
        linkTo="/projects"
      />
    </div>
  );
};

export default OpportunityCards;