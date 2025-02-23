
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface JobFiltersProps {
  searchQuery: string;
  selectedLevel: string;
  onSearchChange: (value: string) => void;
  onLevelChange: (value: string) => void;
}

const JobFilters = ({ searchQuery, selectedLevel, onSearchChange, onLevelChange }: JobFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search jobs by title, company, or keywords"
          className="pl-10"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Select value={selectedLevel} onValueChange={onLevelChange}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Experience Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          <SelectItem value="Entry-Level">Entry Level</SelectItem>
          <SelectItem value="Mid-Level">Mid Level</SelectItem>
          <SelectItem value="Senior">Senior</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default JobFilters;
