import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface TalentHeaderProps {
  onSearch: (query: string) => void;
}

const TalentHeader = ({ onSearch }: TalentHeaderProps) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-white mb-4">Talent Pool</h1>
      <p className="text-xl text-gray-200 mb-8">Find opportunities or hire talent for your startup</p>
      
      <div className="max-w-2xl mx-auto">
        <div className="flex gap-4">
          <Input 
            placeholder="Search opportunities..." 
            className="flex-1"
            onChange={(e) => onSearch(e.target.value)}
          />
          <Button variant="secondary">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TalentHeader;