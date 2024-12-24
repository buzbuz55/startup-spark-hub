import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import FirecrawlService from '@/utils/FirecrawlService';
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type CrawlResult = {
  success: boolean;
  status?: string;
  completed?: number;
  total?: number;
  creditsUsed?: number;
  expiresAt?: string;
  data?: any[];
  error?: string;
}

const Scraper = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [crawlResult, setCrawlResult] = useState<CrawlResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a URL",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setCrawlResult(null);
    
    try {
      const result = await FirecrawlService.crawlWebsite(url);
      setCrawlResult(result);
      
      if (result.success) {
        toast({
          title: "Success",
          description: "Website crawled successfully",
          duration: 3000,
        });
      } else {
        toast({
          title: "Error",
          description: 'error' in result ? result.error : "Failed to crawl website",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to crawl website",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  };

  const renderCrawlData = (data: CrawlResult) => {
    if (!data || (!data.success && !data.data)) return null;
    
    return (
      <div className="space-y-4">
        {data.data?.map((item: any, index: number) => (
          <div key={index} className="border-b pb-4">
            {item.title && (
              <h3 className="font-semibold text-lg">{item.title}</h3>
            )}
            {item.headings && (
              <div className="mt-2">
                <h4 className="font-medium">Headings:</h4>
                <ul className="list-disc pl-5">
                  {item.headings.map((heading: string, i: number) => (
                    <li key={i}>{heading}</li>
                  ))}
                </ul>
              </div>
            )}
            {item.paragraphs && (
              <div className="mt-2">
                <h4 className="font-medium">Content:</h4>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {item.paragraphs.slice(0, 3).map((p: string, i: number) => (
                    <p key={i} className="mt-1">{p}</p>
                  ))}
                  {item.paragraphs.length > 3 && (
                    <p className="mt-1 italic">... and {item.paragraphs.length - 3} more paragraphs</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Website Scraper</h1>
        <div className="max-w-2xl mx-auto">
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="url" className="text-sm font-medium">
                  Website URL
                </label>
                <Input
                  id="url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  required
                />
              </div>
              {isLoading && (
                <Progress value={progress} className="w-full" />
              )}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Crawling..." : "Start Crawl"}
              </Button>
            </form>

            {crawlResult && (
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold">Crawl Results</h3>
                {renderCrawlData(crawlResult)}
              </div>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Scraper;