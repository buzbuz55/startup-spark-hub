import FirecrawlApp from "@mendable/firecrawl-js";

class FirecrawlService {
  private static instance: FirecrawlApp;

  private static getInstance(): FirecrawlApp {
    if (!this.instance) {
      this.instance = new FirecrawlApp({
        apiKey: import.meta.env.VITE_FIRECRAWL_API_KEY || '',
      });
    }
    return this.instance;
  }

  static async crawlWebsite(url: string) {
    const firecrawl = this.getInstance();
    try {
      const response = await firecrawl.crawl({
        url,
        output: "content",
        maxPages: 10
      });
      return response;
    } catch (error) {
      console.error('Error crawling website:', error);
      throw error;
    }
  }
}

export default FirecrawlService;