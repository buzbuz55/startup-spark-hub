import { Button } from "@/components/ui/button";
import { PlusCircle, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface TalentPoolHeaderProps {
  onPostJob: () => void;
  onSubmitProfile: () => void;
}

const TalentPoolHeader = ({ onPostJob, onSubmitProfile }: TalentPoolHeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const handlePostJob = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to post a job opening",
        variant: "destructive",
        action: (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        ),
      });
      return;
    }
    onPostJob();
  };

  const handleSubmitProfile = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit your profile",
        variant: "destructive",
        action: (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        ),
      });
      return;
    }
    onSubmitProfile();
  };

  return (
    <div className="flex justify-center items-center gap-4 mb-12 mt-6">
      <Button 
        onClick={handlePostJob}
        className="bg-primary hover:bg-primary/90 text-white transition-colors px-6"
        size="lg"
      >
        <PlusCircle className="mr-2 h-5 w-5" />
        Post a Job Opening
      </Button>

      <Button 
        onClick={handleSubmitProfile}
        variant="outline"
        size="lg"
        className="border-2 hover:bg-secondary/80 transition-colors px-6"
      >
        <UserPlus className="mr-2 h-5 w-5" />
        Submit Your Profile
      </Button>
    </div>
  );
};

export default TalentPoolHeader;