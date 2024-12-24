import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const IdeaFormHeader = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-6 md:mb-12"
    >
      <h1 className="text-3xl md:text-6xl font-bold text-white mb-3 md:mb-6">
        {t('submit.title')}
      </h1>
      <p className="text-lg md:text-xl text-purple-100 mb-4 md:mb-8 px-2">
        {t('submit.subtitle')}
      </p>
    </motion.div>
  );
};

export default IdeaFormHeader;