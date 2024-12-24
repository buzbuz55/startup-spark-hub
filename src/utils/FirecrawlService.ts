import { FirecrawlClient } from '@mendable/firecrawl-js';

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
  private client: FirecrawlClient;

  constructor(apiKey: string) {
    this.client = new FirecrawlClient(apiKey);
  }

  async crawlWebsite(url: string): Promise<any> {
    try {
      const options: CrawlScrapeOptions = {
        url,
        selectors: [
          { name: 'title', selector: 'h1' },
          { name: 'description', selector: 'meta[name="description"]' }
        ],
        limit: 10,
        format: 'text'
      };

      const response = await this.client.crawl(options);
      return response;
    } catch (error) {
      console.error('Error crawling website:', error);
      throw error;
    }
  }
}