import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Re-added import
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import LanguageSelector from "@/components/LanguageSelector";
import IdeaForm from "@/components/submit-idea/IdeaForm";
import IdeaFormHeader from "@/components/submit-idea/IdeaFormHeader";
import StatsSection from "@/components/submit-idea/StatsSection";
import "../i18n/config";

const SubmitIdea = () => {
  const navigate = useNavigate();
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
        <div className="container mx-auto px-4 pt-24 text-center text-white">
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
      <div className="container mx-auto px-3 pt-24 md:pt-32 pb-8 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <IdeaFormHeader />
          <StatsSection />
          <IdeaForm />
        </motion.div>
      </div>
    </div>
  );
};

export default SubmitIdea;