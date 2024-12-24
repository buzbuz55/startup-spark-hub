import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface OpportunityCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  gradientFrom: string;
  buttonText: string;
  onClick?: () => void;
  linkTo?: string;
}

const OpportunityCard = ({
  title,
  description,
  icon: Icon,
  iconColor,
  gradientFrom,
  buttonText,
  onClick,
  linkTo
}: OpportunityCardProps) => {
  const ButtonWrapper = ({ children }: { children: React.ReactNode }) => {
    if (linkTo) {
      return <Link to={linkTo}>{children}</Link>;
    }
    return <>{children}</>;
  };

  return (
    <div className={`bg-gradient-to-br from-${gradientFrom} to-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all text-center`}>
      <div className="flex justify-center mb-4">
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4 text-sm">{description}</p>
      <ButtonWrapper>
        <Button 
          variant="outline" 
          className="w-full text-sm py-1"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </ButtonWrapper>
    </div>
  );
};

export default OpportunityCard;