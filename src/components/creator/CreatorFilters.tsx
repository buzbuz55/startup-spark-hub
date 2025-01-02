import { useEffect, useRef } from "react";
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

interface CreatorFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedStage: string;
  onStageChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const CreatorFilters = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStage,
  onStageChange,
  sortBy,
  onSortChange,
}: CreatorFiltersProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Featured Projects</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search for projects, ideas, or collaborators..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 border-gray-200"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[180px] border-gray-200 [&>svg]:hidden">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Social Media">Social Media</SelectItem>
            <SelectItem value="Fintech">Fintech</SelectItem>
            <SelectItem value="AI">AI</SelectItem>
            <SelectItem value="Education">Education</SelectItem>
            <SelectItem value="Gaming">Gaming</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedStage} onValueChange={onStageChange}>
          <SelectTrigger className="w-[180px] border-gray-200 [&>svg]:hidden">
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="idea">Idea Stage</SelectItem>
            <SelectItem value="mvp">MVP Stage</SelectItem>
            <SelectItem value="growth">Growth Stage</SelectItem>
            <SelectItem value="fundraising">Fundraising Stage</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px] border-gray-200 [&>svg]:hidden">
            <SelectValue placeholder="Team Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 person</SelectItem>
            <SelectItem value="2-5">2-5 people</SelectItem>
            <SelectItem value="5+">5+ people</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px] border-gray-200 [&>svg]:hidden">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="team_size_asc">Team Size (Low to High)</SelectItem>
            <SelectItem value="team_size_desc">Team Size (High to Low)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CreatorFilters;