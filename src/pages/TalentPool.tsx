import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Briefcase, GraduationCap, Code, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

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
    resume: null as File | null
  });

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Job posting submitted successfully!");
    // Reset form
    setCompanyFormData({
      position: "",
      description: "",
      requirements: "",
      salary: ""
    });
  };

  const handleCandidateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile submitted successfully!");
    // Reset form
    setCandidateFormData({
      fullName: "",
      email: "",
      experience: "",
      portfolio: "",
      expectedSalary: "",
      resume: null
    });
  };

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
              <Link to="/submit-idea">
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
              <Link to="/submit-idea">
                <Button variant="outline" className="w-full">
                  Browse Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Company Job Posting Form */}
        <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Post a Job Opening</h2>
          <form onSubmit={handleCompanySubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Position Title</label>
              <Input
                value={companyFormData.position}
                onChange={(e) => setCompanyFormData({...companyFormData, position: e.target.value})}
                placeholder="e.g., Frontend Developer"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Job Description</label>
              <Textarea
                value={companyFormData.description}
                onChange={(e) => setCompanyFormData({...companyFormData, description: e.target.value})}
                placeholder="Describe the role and responsibilities"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Requirements</label>
              <Textarea
                value={companyFormData.requirements}
                onChange={(e) => setCompanyFormData({...companyFormData, requirements: e.target.value})}
                placeholder="List the required skills and qualifications"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Salary Range</label>
              <Input
                value={companyFormData.salary}
                onChange={(e) => setCompanyFormData({...companyFormData, salary: e.target.value})}
                placeholder="e.g., $60,000 - $80,000"
                required
              />
            </div>
            <Button type="submit" className="w-full">Post Job Opening</Button>
          </form>
        </div>

        {/* Candidate Profile Submission Form */}
        <div className="bg-white rounded-xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6">Submit Your Profile</h2>
          <form onSubmit={handleCandidateSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <Input
                value={candidateFormData.fullName}
                onChange={(e) => setCandidateFormData({...candidateFormData, fullName: e.target.value})}
                placeholder="Your full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                value={candidateFormData.email}
                onChange={(e) => setCandidateFormData({...candidateFormData, email: e.target.value})}
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Experience</label>
              <Textarea
                value={candidateFormData.experience}
                onChange={(e) => setCandidateFormData({...candidateFormData, experience: e.target.value})}
                placeholder="Describe your relevant experience"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Portfolio URL</label>
              <Input
                type="url"
                value={candidateFormData.portfolio}
                onChange={(e) => setCandidateFormData({...candidateFormData, portfolio: e.target.value})}
                placeholder="https://your-portfolio.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Expected Hourly Rate</label>
              <Input
                value={candidateFormData.expectedSalary}
                onChange={(e) => setCandidateFormData({...candidateFormData, expectedSalary: e.target.value})}
                placeholder="e.g., $25/hour"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Resume</label>
              <Input
                type="file"
                onChange={(e) => setCandidateFormData({
                  ...candidateFormData,
                  resume: e.target.files ? e.target.files[0] : null
                })}
                accept=".pdf,.doc,.docx"
                required
              />
              <p className="text-sm text-gray-500 mt-1">Upload your resume (PDF, DOC, or DOCX)</p>
            </div>
            <Button type="submit" className="w-full">Submit Profile</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TalentPool;