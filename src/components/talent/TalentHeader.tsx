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
      className="text-center mb-8 md:mb-12"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Talent Pool</h1>
      <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
        Find opportunities or hire talent for your startup
      </p>
      
      <div className="max-w-md mx-auto px-4">
        <div className="flex gap-2 md:gap-4">
          <Input 
            placeholder="Search opportunities..." 
            className="flex-1 bg-white border-gray-200"
            onChange={(e) => onSearch(e.target.value)}
          />
          <Button variant="default">
            <Search className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Search</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TalentHeader;