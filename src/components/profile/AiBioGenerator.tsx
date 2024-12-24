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
        "✨ Magic AI is analyzing your profile...", 
        { description: currentBio 
          ? "Enhancing your current bio with AI magic!" 
          : "Creating a personalized bio based on your hobbies and interests!" 
        }
      );

      const response = await fetch('/api/generate-bio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.id}`,
        },
        body: JSON.stringify({
          currentBio,
          fullName,
          hobbies,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate bio");
      
      const { generatedBio } = await response.json();
      onBioGenerated(generatedBio);
      toast.success("✨ Bio magically generated!", {
        description: "Your new bio has been crafted with AI magic."
      });
    } catch (error) {
      console.error('Error generating bio:', error);
      toast.error("Couldn't cast the magic spell", {
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
      {isGenerating ? "Casting Magic..." : "Magic AI ✨"}
    </Button>
  );
};

export default AiBioGenerator;