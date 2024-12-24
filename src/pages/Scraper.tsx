import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Scraper = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to use this feature");
        return;
      }

      // Store the URL in Supabase for processing
      const { error } = await supabase
        .from('scraping_requests')
        .insert([
          { url, user_id: user.id, status: 'pending' }
        ]);

      if (error) throw error;

      toast.success("URL submitted for processing");
      setUrl("");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to process URL");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Website Scraper</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL"
                required
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : "Analyze Website"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Scraper;