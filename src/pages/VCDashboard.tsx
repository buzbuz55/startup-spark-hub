import Header from "@/components/Header";
import QuickStats from "@/components/vc-dashboard/QuickStats";
import VCProfileForm from "@/components/vc-dashboard/VCProfileForm";
import TopTechSchools from "@/components/vc-dashboard/TopTechSchools";

const VCDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Dashboard Header */}
          <div className="text-center pt-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Venture Capital Dashboard
            </h1>
            <p className="text-lg text-gray-300">
              Manage your portfolio and discover promising opportunities
            </p>
          </div>

          {/* Quick Stats */}
          <QuickStats />

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <VCProfileForm />
            </div>
            <div className="space-y-8">
              <TopTechSchools />
              {/* Resources Section */}
              <div className="bg-white/10 border border-white/20 rounded-lg p-6 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4">Resources</h2>
                <div className="space-y-3">
                  <a 
                    href="/blog"
                    className="block p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    Startup Blog
                  </a>
                  <a 
                    href="/faq"
                    className="block p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    FAQ
                  </a>
                  <a 
                    href="https://docs.startup-nation.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    Documentation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VCDashboard;