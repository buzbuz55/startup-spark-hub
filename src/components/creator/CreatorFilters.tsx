import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
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

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const resizeObserver = new ResizeObserver((entries) => {
      // Debounce the resize handler
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        for (const entry of entries) {
          if (entry.target === containerRef.current) {
            // Handle resize if needed
          }
        }
      }, 100); // 100ms debounce
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-white rounded-xl shadow-sm p-6 mb-8">
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
        <Button variant="outline" className="text-gray-700 border-gray-200 hover:bg-gray-50">
          MY PROJECTS
        </Button>

        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[180px] border-gray-200">
            <SelectValue placeholder="CATEGORY" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Social Media">Social Media</SelectItem>
            <SelectItem value="Fintech">Fintech</SelectItem>
            <SelectItem value="AI">AI</SelectItem>
            <SelectItem value="Education">Education</SelectItem>
            <SelectItem value="Gaming">Gaming</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px] border-gray-200">
            <SelectValue placeholder="LOCATION" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="onsite">On-site</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px] border-gray-200">
            <SelectValue placeholder="TEAM SIZE" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 person</SelectItem>
            <SelectItem value="2-5">2-5 people</SelectItem>
            <SelectItem value="5+">5+ people</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedStage} onValueChange={onStageChange}>
          <SelectTrigger className="w-[180px] border-gray-200">
            <SelectValue placeholder="STAGE" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="idea">Idea Phase</SelectItem>
            <SelectItem value="mvp">MVP</SelectItem>
            <SelectItem value="growth">Growth</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px] border-gray-200">
            <SelectValue placeholder="SORT BY" />
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