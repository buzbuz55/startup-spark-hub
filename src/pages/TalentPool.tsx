import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Briefcase, GraduationCap, Code } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { useState } from "react";
import InternGrid from "@/components/talent/InternGrid";
import StartupIdeas from "@/components/talent/StartupIdeas";
import JobPostingForm from "@/components/talent/JobPostingForm";
import CandidateForm from "@/components/talent/CandidateForm";
import ChatBot from "@/components/talent/ChatBot";

const TalentPool = () => {
  const [companyFormData, setCompanyFormData] = useState({
    position: "",
    description: "",
    requirements: "",
    salary: ""
  });

  const [candidateFormData, setCandidateFormData] = useState({
    fullName: "",
    email: "",
    experience: "",
    portfolio: "",
    expectedSalary: "",
    resume: null as File | null,
    githubUrl: "" // Added githubUrl property
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12">
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
              <Link to="/vc-dashboard">
                <Button variant="outline" className="w-full">
                  View Positions
                </Button>
              </Link>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-white p-6 rounded-lg">
              <GraduationCap className="w-12 h-12 text-blue-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Internships</h2>
              <p className="text-gray-600 mb-4">Gain valuable experience in startups</p>
              <Link to="/submit-idea">
                <Button variant="outline" className="w-full">
                  Find Internships
                </Button>
              </Link>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-white p-6 rounded-lg">
              <Code className="w-12 h-12 text-green-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Freelance Projects</h2>
              <p className="text-gray-600 mb-4">Work on exciting freelance opportunities</p>
              <Link to="/messages">
                <Button variant="outline" className="w-full">
                  Browse Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-12 mt-12">
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">Featured Interns</h2>
            <InternGrid />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-6">Hot Startup Opportunities</h2>
            <StartupIdeas />
          </section>
        <JobPostingForm 
          companyFormData={companyFormData}
          setCompanyFormData={setCompanyFormData}
        />

        <CandidateForm 
          candidateFormData={candidateFormData}
          setCandidateFormData={setCandidateFormData}
        />
      </div>
      <ChatBot />
    </div>
  );
};

export default TalentPool;
