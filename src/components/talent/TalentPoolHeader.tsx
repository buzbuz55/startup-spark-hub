import { Button } from "@/components/ui/button";
import { PlusCircle, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface TalentPoolHeaderProps {
  onPostJob: () => void;
  onSubmitProfile: () => void;
}

const TalentPoolHeader = ({ onPostJob, onSubmitProfile }: TalentPoolHeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <div className="flex items-center gap-4 mb-8">
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
    </div>
  );
};

export default TalentPoolHeader;