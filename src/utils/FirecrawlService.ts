import FirecrawlApp from '@mendable/firecrawl-js';

interface CrawlScrapeOptions {
  url: string;
  selectors?: Array<{
    name: string;
    selector: string;
  }>;
  limit?: number;
  format?: 'text' | 'html';
}

export class FirecrawlService {
  private static instance: FirecrawlApp | null = null;

  private static getInstance(): FirecrawlApp {
    if (!this.instance) {
      const apiKey = process.env.FIRECRAWL_API_KEY || '';
      this.instance = new FirecrawlApp({ apiKey });
    }
    return this.instance;
  }

  static async crawlWebsite(url: string): Promise<any> {
    try {
      const firecrawl = this.getInstance();
      
      const response = await firecrawl.crawlUrl(url, {
        limit: 10,
        scrapeOptions: {
          formats: ['text'],
          extract: [
            { selector: 'h1', name: 'title' },
            { selector: 'meta[name="description"]', name: 'description' },
            { selector: 'p', name: 'paragraphs' },
            { selector: 'h2,h3,h4', name: 'headings' }
          ]
        }
      });

      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Error crawling website:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to crawl website'
      };
    }
  }
}