import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StartupGrid from "@/components/startups/StartupGrid";
import { motion } from "framer-motion";

const CompanyDirectory = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-12 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Company Directory
              </span>
            </h1>
            <p className="text-gray-600 text-lg">
              Discover innovative companies and find your next opportunity
            </p>
          </div>
          <StartupGrid />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default CompanyDirectory;