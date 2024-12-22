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
      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
    >
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
      <p className="text-purple-200">{t(translationKey)}</p>
    </motion.div>
  );
};

export default StatsCard;