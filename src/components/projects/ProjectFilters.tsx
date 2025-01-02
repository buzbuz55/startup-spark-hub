import { Button } from "@/components/ui/button";
import { Plus, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import CreateProjectDialog from "./CreateProjectDialog";

export interface ProjectFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (value: string) => void;
  selectedStage?: string;
  onStageChange?: (value: string) => void;
  sortBy?: string;
  onSortChange?: (value: string) => void;
}

const ProjectFilters = ({ 
  selectedCategory,
  onCategoryChange,
  selectedStage,
  onStageChange,
  sortBy,
  onSortChange 
}: ProjectFiltersProps) => {
  const [showCreateProject, setShowCreateProject] = useState(false);

  return (
    <div className="bg-[#0D1117] text-white p-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Filter by:</span>
          <Button variant="outline" className="bg-[#21262D] text-white border-gray-700 hover:bg-[#30363D]">
            MY PROJECTS
          </Button>

          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-[150px] bg-[#21262D] border-gray-700 text-white">
              <SelectValue placeholder="CATEGORY" />
              <ChevronDown className="h-4 w-4 opacity-50" />
            </SelectTrigger>
            <SelectContent className="bg-[#21262D] border-gray-700">
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="health">Healthcare</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStage} onValueChange={onStageChange}>
            <SelectTrigger className="w-[150px] bg-[#21262D] border-gray-700 text-white">
              <SelectValue placeholder="LOCATION" />
              <ChevronDown className="h-4 w-4 opacity-50" />
            </SelectTrigger>
            <SelectContent className="bg-[#21262D] border-gray-700">
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="onsite">On-site</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[150px] bg-[#21262D] border-gray-700 text-white">
              <SelectValue placeholder="TEAM SIZE" />
              <ChevronDown className="h-4 w-4 opacity-50" />
            </SelectTrigger>
            <SelectContent className="bg-[#21262D] border-gray-700">
              <SelectItem value="1-5">1-5 members</SelectItem>
              <SelectItem value="6-10">6-10 members</SelectItem>
              <SelectItem value="11+">11+ members</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[150px] bg-[#21262D] border-gray-700 text-white">
              <SelectValue placeholder="STAGE" />
              <ChevronDown className="h-4 w-4 opacity-50" />
            </SelectTrigger>
            <SelectContent className="bg-[#21262D] border-gray-700">
              <SelectItem value="idea">Idea Phase</SelectItem>
              <SelectItem value="mvp">MVP</SelectItem>
              <SelectItem value="beta">Beta</SelectItem>
              <SelectItem value="launched">Launched</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            className="bg-[#21262D] border-gray-700 text-white hover:bg-[#30363D]"
          >
            Sort by
          </Button>
        </div>

        <Button 
          onClick={() => setShowCreateProject(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Project
        </Button>
      </div>

      <div className="text-sm text-gray-400">
        Projects matching filters: 1770
      </div>

      <CreateProjectDialog 
        open={showCreateProject} 
        onOpenChange={setShowCreateProject}
      />
    </div>
  );
};

export default ProjectFilters;