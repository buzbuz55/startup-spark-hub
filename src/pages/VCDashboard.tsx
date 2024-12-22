import Header from "@/components/Header";
import QuickStats from "@/components/vc-dashboard/QuickStats";
import VCProfileForm from "@/components/vc-dashboard/VCProfileForm";
import TopTechSchools from "@/components/vc-dashboard/TopTechSchools";

const VCDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 py-20">
      <Header />
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Dashboard Header */}
          <div className="text-center text-white mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">VC Dashboard 🚀</h1>
            <p className="text-xl text-purple-200">
              Discover the next unicorn from top tech hubs worldwide 🌍
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