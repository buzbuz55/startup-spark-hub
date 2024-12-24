import { Button } from "@/components/ui/button";
import { PlusCircle, UserPlus, Search } from "lucide-react";

interface TalentPoolHeaderProps {
  onPostJob: () => void;
  onSubmitProfile: () => void;
}

const TalentPoolHeader = ({ onPostJob, onSubmitProfile }: TalentPoolHeaderProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        <Button 
          onClick={onPostJob}
          className="bg-primary hover:bg-primary/90"
          size="lg"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Post a Job Opening
        </Button>

        <Button 
          onClick={onSubmitProfile}
          variant="outline"
          size="lg"
          className="flex-shrink-0"
        >
          <UserPlus className="mr-2 h-5 w-5" />
          Submit Your Profile
        </Button>

        <Button
          variant="secondary"
          size="lg"
          className="flex-shrink-0"
          onClick={onSubmitProfile}
        >
          <Search className="mr-2 h-5 w-5" />
          Search Opportunities
        </Button>
      </div>
    </div>
  );
};

export default TalentPoolHeader;