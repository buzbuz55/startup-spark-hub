import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SortAsc } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface TalentSearchProps {
  onSearch: (query: string) => void;
  onSort: (criteria: string) => void;
}

const TalentSearch = ({ onSearch, onSort }: TalentSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleSearch = () => {
    onSearch(searchQuery);
    if (searchQuery.trim()) {
      toast({
        title: "Searching...",
        description: `Looking for talents matching "${searchQuery}"`,
      });
    }
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name, role, or skills..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (!e.target.value.trim()) {
                onSearch(""); // Clear search when input is empty
              }
            }}
            className="pl-9"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Select onValueChange={onSort} defaultValue="name">
          <SelectTrigger className="w-[180px]">
            <SortAsc className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="role">Role</SelectItem>
            <SelectItem value="skills">Skills</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleSearch}>Search</Button>
      </div>
    </div>
  );
};

export default TalentSearch;