import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface StatsCardProps {
  icon: React.ElementType;
  title: string;
  translationKey: string;
}

const StatsCard = ({ icon: Icon, title, translationKey }: StatsCardProps) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-6 text-center"
    >
      <div className="inline-flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/20 mb-2 md:mb-4">
        <Icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
      </div>
      <h3 className="text-lg md:text-2xl font-bold text-white mb-0.5 md:mb-1">{title}</h3>
      <p className="text-purple-200 text-sm md:text-base">{t(translationKey)}</p>
    </motion.div>
  );
};

export default StatsCard;