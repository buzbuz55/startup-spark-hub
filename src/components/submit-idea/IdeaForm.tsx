import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

// Form validation schema
const ideaSchema = z.object({
  title: z.string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be less than 100 characters"),
  description: z.string()
    .min(20, "Description must be at least 20 characters long")
    .max(1000, "Description must be less than 1000 characters"),
  market: z.string()
    .min(5, "Market description must be at least 5 characters long")
    .max(200, "Market description must be less than 200 characters"),
  team: z.string()
    .min(5, "Team description must be at least 5 characters long")
    .max(200, "Team description must be less than 200 characters"),
  email: z.string()
    .email("Please enter a valid email address"),
});

const IdeaForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    market: "",
    team: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string) => {
    try {
      ideaSchema.shape[name as keyof typeof ideaSchema.shape].parse(value);
      setErrors(prev => ({ ...prev, [name]: "" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [name]: error.errors[0].message }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate all fields
      const validatedData = ideaSchema.parse(formData);
      
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        toast.error("Please sign in to submit your idea");
        return;
      }

      const { error: messageError } = await supabase
        .from('startup_ideas')
        .insert([{
          user_id: user.id,
          ...validatedData,
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
      setTouched({});
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
        toast.error("Please fix the form errors before submitting");
      } else {
        console.error('Error:', error);
        toast.error("An error occurred while submitting your idea");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 md:p-8 shadow-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-white text-base md:text-lg font-medium">
            {t('submit.idea.label')}
          </label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={t('submit.idea.placeholder')}
            className={`bg-white/20 border-white/10 text-white placeholder:text-white/60 text-sm md:text-base ${
              errors.title && touched.title ? 'border-red-400' : ''
            }`}
            required
          />
          {errors.title && touched.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-white text-base md:text-lg font-medium">
            {t('submit.description.label')}
          </label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={t('submit.description.placeholder')}
            className={`bg-white/20 border-white/10 text-white placeholder:text-white/60 min-h-[80px] md:min-h-[120px] text-sm md:text-base ${
              errors.description && touched.description ? 'border-red-400' : ''
            }`}
            required
          />
          {errors.description && touched.description && (
            <p className="text-red-400 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-white text-base md:text-lg font-medium">
            {t('submit.market.label')}
          </label>
          <Input
            name="market"
            value={formData.market}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={t('submit.market.placeholder')}
            className={`bg-white/20 border-white/10 text-white placeholder:text-white/60 text-sm md:text-base ${
              errors.market && touched.market ? 'border-red-400' : ''
            }`}
            required
          />
          {errors.market && touched.market && (
            <p className="text-red-400 text-sm mt-1">{errors.market}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-white text-base md:text-lg font-medium">
            {t('submit.team.label')}
          </label>
          <Input
            name="team"
            value={formData.team}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={t('submit.team.placeholder')}
            className={`bg-white/20 border-white/10 text-white placeholder:text-white/60 text-sm md:text-base ${
              errors.team && touched.team ? 'border-red-400' : ''
            }`}
            required
          />
          {errors.team && touched.team && (
            <p className="text-red-400 text-sm mt-1">{errors.team}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-white text-base md:text-lg font-medium">
            {t('submit.email.label')}
          </label>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={t('submit.email.placeholder')}
            className={`bg-white/20 border-white/10 text-white placeholder:text-white/60 text-sm md:text-base ${
              errors.email && touched.email ? 'border-red-400' : ''
            }`}
            required
          />
          {errors.email && touched.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full bg-white text-purple-700 hover:bg-purple-100 font-semibold text-base md:text-lg h-10 md:h-12"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              {t('submit.submitting')}
            </div>
          ) : (
            <>
              <Sparkles className="mr-2 w-4 h-4 md:w-5 md:h-5" />
              {t('submit.button')}
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default IdeaForm;