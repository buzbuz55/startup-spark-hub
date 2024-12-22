import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Briefcase, GraduationCap, Code } from "lucide-react";

const TalentPool = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Talent Pool</h1>
          <p className="text-xl text-gray-200">Find opportunities or hire talent for your startup</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
          <div className="flex gap-4 mb-8">
            <Input placeholder="Search opportunities..." className="flex-1" />
            <Button>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-100 to-white p-6 rounded-lg">
              <Briefcase className="w-12 h-12 text-purple-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Full-time Positions</h2>
              <p className="text-gray-600 mb-4">Join innovative startups and make an impact</p>
              <Button variant="outline" className="w-full">View Positions</Button>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-white p-6 rounded-lg">
              <GraduationCap className="w-12 h-12 text-blue-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Internships</h2>
              <p className="text-gray-600 mb-4">Gain valuable experience in startups</p>
              <Button variant="outline" className="w-full">Find Internships</Button>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-white p-6 rounded-lg">
              <Code className="w-12 h-12 text-green-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Freelance Projects</h2>
              <p className="text-gray-600 mb-4">Work on exciting freelance opportunities</p>
              <Button variant="outline" className="w-full">Browse Projects</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentPool;