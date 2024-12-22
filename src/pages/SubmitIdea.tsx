import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Rocket, Users, Trophy } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import LanguageSelector from "@/components/LanguageSelector";
import StatsCard from "@/components/submit-idea/StatsCard";
import IdeaForm from "@/components/submit-idea/IdeaForm";
import "../i18n/config";

const SubmitIdea = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        navigate("/login");
        return;
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error checking auth status:", error);
      navigate("/login");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700">
        <Header />
        <div className="container mx-auto px-4 pt-16 text-center text-white">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700">
      <Header />
      <div className="absolute top-2 right-2 md:top-4 md:right-4">
        <LanguageSelector />
      </div>
      <div className="container mx-auto px-3 pt-16 md:pt-24 pb-8 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-6 md:mb-12">
            <h1 className="text-3xl md:text-6xl font-bold text-white mb-3 md:mb-6">
              {t('submit.title')}
            </h1>
            <p className="text-lg md:text-xl text-purple-100 mb-4 md:mb-8 px-2">
              {t('submit.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-6 mb-6 md:mb-12">
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
          </div>

          <IdeaForm />
        </motion.div>
      </div>
    </div>
  );
};

export default SubmitIdea;