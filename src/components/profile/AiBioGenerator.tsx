import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface AiBioGeneratorProps {
  currentBio: string | null;
  fullName: string;
  hobbies: string[];
  onBioGenerated: (bio: string) => void;
}

const AiBioGenerator = ({ currentBio, fullName, hobbies, onBioGenerated }: AiBioGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateBio = async () => {
    try {
      setIsGenerating(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      // Show a hint toast before generating
      toast.info(
        "✨ AI Magic is reading your profile...", 
        { description: currentBio 
          ? "Analyzing your current bio to create something even better!" 
          : "Creating a personalized bio based on your profile!" 
        }
      );

      const { data, error } = await supabase.functions.invoke('generate-bio', {
        body: {
          currentBio,
          fullName,
          hobbies,
        },
      });

      if (error) throw error;
      
      onBioGenerated(data.generatedBio);
      toast.success("✨ AI Magic Complete!", {
        description: "Your new bio has been crafted and applied automatically."
      });
    } catch (error) {
      console.error('Error generating bio:', error);
      toast.error("AI Magic encountered an error", {
        description: "Please try again in a moment."
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={generateBio}
      disabled={isGenerating}
      className="gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300"
    >
      <Wand2 className={`w-4 h-4 ${isGenerating ? 'animate-bounce' : 'animate-pulse'}`} />
      {isGenerating ? "AI Magic in Progress..." : "AI Magic ✨"}
    </Button>
  );
};

export default AiBioGenerator;