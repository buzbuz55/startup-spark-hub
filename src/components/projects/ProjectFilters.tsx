import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface ProjectFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const ProjectFilters = ({ searchQuery, onSearchChange }: ProjectFiltersProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex gap-4">
        <Input 
          placeholder="Search projects..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1"
        />
        <Button>
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default ProjectFilters;