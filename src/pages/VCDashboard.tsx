import Header from "@/components/Header";
import QuickStats from "@/components/vc-dashboard/QuickStats";
import VCProfileForm from "@/components/vc-dashboard/VCProfileForm";
import TopTechSchools from "@/components/vc-dashboard/TopTechSchools";

const VCDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#221F26] to-[#403E43] py-20">
      <Header />
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Dashboard Header */}
          <div className="text-center text-white mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Venture Capital Dashboard
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Manage your portfolio and discover promising opportunities
            </p>
          </div>

          {/* Quick Stats */}
          <QuickStats />

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <VCProfileForm />
            <TopTechSchools />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VCDashboard;