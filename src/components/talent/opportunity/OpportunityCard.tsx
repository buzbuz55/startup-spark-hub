import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
      return <Link to={linkTo} className="w-full">{children}</Link>;
    }
    return <>{children}</>;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`bg-gradient-to-br from-${gradientFrom} to-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all text-center flex flex-col justify-between min-h-[280px]`}
    >
      <div>
        <div className="flex justify-center mb-6">
          <div className={`${iconColor} bg-white p-4 rounded-full shadow-sm`}>
            <Icon className="w-8 h-8" />
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-3">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
      </div>
      <ButtonWrapper>
        <Button 
          variant="outline" 
          className="w-full text-base py-2 border-2"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </ButtonWrapper>
    </motion.div>
  );
};

export default OpportunityCard;