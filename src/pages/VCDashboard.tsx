import Header from "@/components/Header";
import QuickStats from "@/components/vc-dashboard/QuickStats";
import VCProfileForm from "@/components/vc-dashboard/VCProfileForm";
import TopTechSchools from "@/components/vc-dashboard/TopTechSchools";
import { ThemeToggle } from "@/components/ThemeToggle";

const VCDashboard = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <Header />
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between pt-20">
            <div className="text-center flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Venture Capital Dashboard
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Manage your portfolio and discover promising opportunities
              </p>
            </div>
            <ThemeToggle />
          </div>

          {/* Quick Stats */}
          <QuickStats />

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <VCProfileForm />
            </div>
            <div>
              <TopTechSchools />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VCDashboard;