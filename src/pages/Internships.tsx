import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InternGrid from "@/components/talent/InternGrid";
import TalentHeader from "@/components/talent/TalentHeader";
import { useState } from "react";

const Internships = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Internship Opportunities</h1>
          <TalentHeader onSearch={setSearchQuery} />
          <InternGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Internships;