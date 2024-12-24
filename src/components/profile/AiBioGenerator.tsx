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
      toast.success("Bio generated successfully!");
    } catch (error) {
      console.error('Error generating bio:', error);
      toast.error("Failed to generate bio");
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
      className="gap-2"
    >
      <Wand2 className="w-4 h-4" />
      {isGenerating ? "Generating..." : "Generate AI Bio"}
    </Button>
  );
};

export default AiBioGenerator;