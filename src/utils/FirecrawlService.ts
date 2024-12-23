import FirecrawlApp from '@mendable/firecrawl-js';

interface ErrorResponse {
  success: false;
  error: string;
}

interface CrawlStatusResponse {
  success: true;
  status: string;
  completed: number;
  total: number;
  creditsUsed: number;
  expiresAt: string;
  data: any[];
}

type CrawlResponse = CrawlStatusResponse | ErrorResponse;

export class FirecrawlService {
  private static firecrawlApp: FirecrawlApp | null = null;

  static async crawlWebsite(url: string): Promise<{ success: boolean; error?: string; data?: any }> {
    try {
      console.log('Making crawl request to Firecrawl API');
      if (!this.firecrawlApp) {
        const response = await fetch('/api/firecrawl-key');
        if (!response.ok) {
          throw new Error('Failed to fetch Firecrawl API key');
        }
        const { apiKey } = await response.json();
        this.firecrawlApp = new FirecrawlApp({ apiKey });
      }

      const crawlResponse = await this.firecrawlApp.crawlUrl(url, {
        limit: 10, // Reduced limit for faster response
        scrapeOptions: {
          formats: ['content'], // Using content format for text extraction
          extract: [
            { name: 'title', selector: 'title' },
            { name: 'headings', selector: 'h1, h2, h3' },
            { name: 'paragraphs', selector: 'p' }
          ]
        }
      });

      if (!crawlResponse.success) {
        console.error('Crawl failed:', crawlResponse);
        return { 
          success: false, 
          error: 'Failed to crawl website' 
        };
      }

      return { 
        success: true,
        data: crawlResponse 
      };
    } catch (error) {
      console.error('Error during crawl:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to connect to Firecrawl API' 
      };
    }
  }
}