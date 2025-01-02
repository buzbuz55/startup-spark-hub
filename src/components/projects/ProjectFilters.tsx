import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  searchQuery, 
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStage,
  onStageChange,
  sortBy,
  onSortChange 
}: ProjectFiltersProps) => {
  return (
    <div className="bg-[#0D1117] text-white p-6 rounded-lg mb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Featured Projects</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Project
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Search for a specific project..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-[#161B22] border-gray-700 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="text-sm text-gray-400">Filter by:</div>
        
        {selectedCategory !== undefined && (
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-[150px] bg-[#161B22] border-gray-700 text-white">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-[#161B22] border-gray-700">
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="health">Healthcare</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        )}

        {selectedStage !== undefined && (
          <Select value={selectedStage} onValueChange={onStageChange}>
            <SelectTrigger className="w-[150px] bg-[#161B22] border-gray-700 text-white">
              <SelectValue placeholder="Stage" />
            </SelectTrigger>
            <SelectContent className="bg-[#161B22] border-gray-700">
              <SelectItem value="idea">Idea Stage</SelectItem>
              <SelectItem value="mvp">MVP Stage</SelectItem>
              <SelectItem value="growth">Growth Stage</SelectItem>
              <SelectItem value="fundraising">Fundraising Stage</SelectItem>
            </SelectContent>
          </Select>
        )}

        <Select>
          <SelectTrigger className="w-[150px] bg-[#161B22] border-gray-700 text-white">
            <SelectValue placeholder="Team Size" />
          </SelectTrigger>
          <SelectContent className="bg-[#161B22] border-gray-700">
            <SelectItem value="1-5">1-5 members</SelectItem>
            <SelectItem value="6-10">6-10 members</SelectItem>
            <SelectItem value="11+">11+ members</SelectItem>
          </SelectContent>
        </Select>

        {sortBy !== undefined && (
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[150px] bg-[#161B22] border-gray-700 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-[#161B22] border-gray-700">
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
};

export default ProjectFilters;