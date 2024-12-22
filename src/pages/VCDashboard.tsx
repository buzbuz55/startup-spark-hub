import Header from "@/components/Header";
import QuickStats from "@/components/vc-dashboard/QuickStats";
import VCProfileForm from "@/components/vc-dashboard/VCProfileForm";
import TopTechSchools from "@/components/vc-dashboard/TopTechSchools";
import PortfolioOverview from "@/components/vc-dashboard/PortfolioOverview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VCDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Dashboard Header */}
          <div className="text-center pt-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Venture Capital Dashboard
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Track your portfolio, discover promising opportunities, and manage your investments all in one place
            </p>
          </div>

          {/* Quick Stats Section */}
          <QuickStats />

          {/* Main Dashboard Content */}
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 rounded-lg p-1">
              <TabsTrigger value="profile" className="text-white">
                Profile & Settings
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="text-white">
                Portfolio
              </TabsTrigger>
              <TabsTrigger value="resources" className="text-white">
                Resources
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <VCProfileForm />
                </div>
                <div>
                  <TopTechSchools />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="portfolio" className="mt-6">
              <PortfolioOverview />
            </TabsContent>

            <TabsContent value="resources" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ResourceCard
                  title="Startup Blog"
                  description="Latest insights and trends in the startup ecosystem"
                  link="/blog"
                  icon="BookOpen"
                />
                <ResourceCard
                  title="FAQ"
                  description="Common questions about venture capital and investments"
                  link="/faq"
                  icon="HelpCircle"
                />
                <ResourceCard
                  title="Documentation"
                  description="Detailed guides and resources for VCs"
                  link="https://docs.startup-nation.com"
                  icon="FileText"
                  external
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Resource Card Component
const ResourceCard = ({ title, description, link, icon, external = false }) => {
  const Icon = dynamic(() => import('lucide-react').then((mod) => mod[icon]));
  
  return (
    <a
      href={link}
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer" : ""}
      className="block p-6 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <Icon className="w-5 h-5 text-purple-400" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-400 text-sm">{description}</p>
    </a>
  );
};

export default VCDashboard;