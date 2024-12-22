import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const IdeaForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    market: "",
    team: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        toast.error("Please sign in to submit your idea");
        return;
      }

      const { error: messageError } = await supabase
        .from('messages')
        .insert([{
          sender_id: user.id,
          receiver_id: user.id,
          content: JSON.stringify({
            type: 'startup_idea',
            ...formData,
            timestamp: new Date().toISOString()
          })
        }]);

      if (messageError) throw messageError;

      toast.success("Your idea has been submitted! 🚀");
      setFormData({
        title: "",
        description: "",
        market: "",
        team: "",
        email: "",
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error("An error occurred while submitting your idea");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-white text-lg font-medium">{t('submit.idea.label')}</label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder={t('submit.idea.placeholder')}
            className="bg-white/20 border-white/10 text-white placeholder:text-white/60"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-white text-lg font-medium">{t('submit.description.label')}</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder={t('submit.description.placeholder')}
            className="bg-white/20 border-white/10 text-white placeholder:text-white/60 min-h-[120px]"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-white text-lg font-medium">{t('submit.market.label')}</label>
          <Input
            name="market"
            value={formData.market}
            onChange={handleChange}
            placeholder={t('submit.market.placeholder')}
            className="bg-white/20 border-white/10 text-white placeholder:text-white/60"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-white text-lg font-medium">{t('submit.team.label')}</label>
          <Input
            name="team"
            value={formData.team}
            onChange={handleChange}
            placeholder={t('submit.team.placeholder')}
            className="bg-white/20 border-white/10 text-white placeholder:text-white/60"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-white text-lg font-medium">{t('submit.email.label')}</label>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t('submit.email.placeholder')}
            className="bg-white/20 border-white/10 text-white placeholder:text-white/60"
            required
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full bg-white text-purple-700 hover:bg-purple-100 font-semibold text-lg"
        >
          <Sparkles className="mr-2" />
          {isSubmitting ? "Submitting..." : t('submit.button')}
        </Button>
      </form>
    </motion.div>
  );
};

export default IdeaForm;