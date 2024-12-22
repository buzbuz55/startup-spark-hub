import Header from "@/components/Header";
import ProjectForm from "@/components/projects/ProjectForm";
import CandidateForm from "@/components/talent/CandidateForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Projects = () => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [candidateFormData, setCandidateFormData] = useState({
    fullName: "",
    email: "",
    experience: "",
    portfolio: "",
    expectedSalary: "",
    resume: null,
    githubUrl: ""
  });

  // Mock project data (in a real app, this would come from a backend)
  const projects = [
    {
      id: 1,
      title: "AI-Powered Education Platform",
      description: "Building an innovative education platform using AI to personalize learning experiences.",
      requiredSkills: "React, Python, Machine Learning",
      teamSize: "3-4 members",
      projectStage: "MVP",
      compensation: "Equity + Revenue Share"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Startup Projects</h1>
          <Button onClick={() => setShowProjectForm(!showProjectForm)} className="gap-2">
            <Plus className="w-4 h-4" />
            Create Project
          </Button>
        </div>

        {showProjectForm && (
          <div className="mb-8">
            <ProjectForm />
          </div>
        )}

        <div className="grid gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold">Required Skills</h3>
                  <p className="text-gray-600">{project.requiredSkills}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Team Size</h3>
                  <p className="text-gray-600">{project.teamSize}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Project Stage</h3>
                  <p className="text-gray-600">{project.projectStage}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Compensation</h3>
                  <p className="text-gray-600">{project.compensation}</p>
                </div>
              </div>

              <Button 
                onClick={() => setShowApplicationForm(!showApplicationForm)}
                variant="outline"
              >
                Apply to Join
              </Button>
            </div>
          ))}
        </div>

        {showApplicationForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Apply to Join Project</h2>
                <CandidateForm
                  candidateFormData={candidateFormData}
                  setCandidateFormData={setCandidateFormData}
                />
                <Button 
                  variant="outline" 
                  onClick={() => setShowApplicationForm(false)}
                  className="mt-4 w-full"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;