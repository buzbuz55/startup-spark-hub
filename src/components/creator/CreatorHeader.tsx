import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CreatorHeaderProps {
  onCreateProject: () => void;
}

const CreatorHeader = ({ onCreateProject }: CreatorHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Creator Hub
        </h1>
        <p className="text-gray-600 mt-2">
          Connect, collaborate, and bring your ideas to life
        </p>
      </div>
      <Button 
        onClick={onCreateProject}
        className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm hover:shadow-md transition-all"
      >
        <Plus className="w-4 h-4 mr-2" />
        Create Project
      </Button>
    </div>
  );
};

export default CreatorHeader;