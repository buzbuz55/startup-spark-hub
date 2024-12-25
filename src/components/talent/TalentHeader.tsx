import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface TalentHeaderProps {
  onSearch: (query: string) => void;
}

const TalentHeader = ({ onSearch }: TalentHeaderProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex gap-2">
          <Input 
            placeholder="Search opportunities..." 
            className="flex-1 bg-white border-gray-200 h-12 text-base"
            onChange={(e) => onSearch(e.target.value)}
          />
          <Button variant="default" size="lg" className="h-12 px-6">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TalentHeader;