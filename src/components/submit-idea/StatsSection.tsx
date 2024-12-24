import { motion } from "framer-motion";
import { Rocket, Users, Trophy } from "lucide-react";
import StatsCard from "./StatsCard";

const StatsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid grid-cols-3 gap-2 md:gap-6 mb-6 md:mb-12"
    >
      <StatsCard 
        icon={Rocket} 
        title="500+" 
        translationKey="stats.startups" 
      />
      <StatsCard 
        icon={Users} 
        title="10k+" 
        translationKey="stats.founders" 
      />
      <StatsCard 
        icon={Trophy} 
        title="$2M+" 
        translationKey="stats.funding" 
      />
    </motion.div>
  );
};

export default StatsSection;