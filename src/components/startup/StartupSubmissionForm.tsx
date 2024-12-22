import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const StartupSubmissionForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to submit an opportunity");
        return;
      }

      const { error } = await supabase
        .from('startup_ideas')
        .insert({
          user_id: user.id,
          title,
          description,
          market: "General",
          team: "Looking for team",
          email: user.email || "",
        });

      if (error) throw error;

      toast.success("Opportunity submitted successfully!");
      setTitle("");
      setDescription("");
      onSubmit();
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to submit opportunity");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Post a Startup Opportunity</h2>
      <div>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title of the opportunity"
          required
        />
      </div>
      <div>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the opportunity"
          className="min-h-[100px]"
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default StartupSubmissionForm;