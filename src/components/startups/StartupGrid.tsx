import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StartupData {
  name: string;
  logo: string;
  jobCount: number;
}

const startupData: StartupData[] = [
  { name: "SpaceX", logo: "/lovable-uploads/spacex-logo.png", jobCount: 1734 },
  { name: "Stripe", logo: "/lovable-uploads/stripe-logo.png", jobCount: 1502 },
  { name: "Warby Parker", logo: "/lovable-uploads/warby-parker-logo.png", jobCount: 1185 },
  { name: "Cloudflare", logo: "/lovable-uploads/cloudflare-logo.png", jobCount: 558 },
  { name: "Airbnb", logo: "/lovable-uploads/airbnb-logo.png", jobCount: 433 },
  { name: "Deliveroo", logo: "/lovable-uploads/deliveroo-logo.png", jobCount: 428 },
  { name: "Lyft", logo: "/lovable-uploads/lyft-logo.png", jobCount: 348 },
  { name: "Reddit", logo: "/lovable-uploads/reddit-logo.png", jobCount: 339 },
  { name: "Pinterest", logo: "/lovable-uploads/pinterest-logo.png", jobCount: 323 },
  { name: "Palantir Technologies", logo: "/lovable-uploads/palantir-logo.png", jobCount: 302 },
  { name: "OpenAI", logo: "/lovable-uploads/openai-logo.png", jobCount: 295 },
  { name: "SimilarWeb", logo: "/lovable-uploads/similarweb-logo.png", jobCount: 277 },
  // ... Add more startups as needed
];

const StartupGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {startupData.map((startup, index) => (
        <Card 
          key={index}
          className={cn(
            "p-4 hover:shadow-lg transition-shadow cursor-pointer",
            "flex items-center space-x-4"
          )}
        >
          <div className="w-12 h-12 relative flex-shrink-0">
            <img
              src={startup.logo}
              alt={`${startup.name} logo`}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="font-medium text-base">{startup.name}</h3>
            <p className="text-sm text-gray-500">{startup.jobCount} jobs</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StartupGrid;