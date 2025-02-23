import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JobFilters from "@/components/jobs/JobFilters";
import JobCard from "@/components/jobs/JobCard";
import type { Job } from "@/components/jobs/types";

// Move jobs data to a separate file later if needed
const jobs: Job[] = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    salary: "$120k - $180k",
    type: "Full-time",
    level: "Senior",
    description: "Looking for an experienced full stack developer to lead development of our main product."
  },
  {
    id: 2,
    title: "AI Research Assistant",
    company: "AI Innovations",
    location: "Remote",
    salary: "$90k - $120k",
    type: "Full-time",
    level: "Mid-Level",
    description: "Join our AI research team to help develop cutting-edge machine learning models."
  },
  {
    id: 3,
    title: "Technical Support Specialist",
    company: "CloudTech Services",
    location: "Austin, TX",
    salary: "$60k - $80k",
    type: "Full-time",
    level: "Entry-Level",
    description: "Provide technical support for our enterprise cloud platform."
  },
  {
    id: 4,
    title: "Frontend Developer",
    company: "WebDesign Pro",
    location: "New York, NY",
    salary: "$90k - $130k",
    type: "Full-time",
    level: "Mid-Level",
    description: "Create beautiful and responsive web interfaces using React and TypeScript."
  },
  {
    id: 5,
    title: "Software Engineering Manager",
    company: "Innovation Labs",
    location: "Seattle, WA",
    salary: "$150k - $200k",
    type: "Full-time",
    level: "Senior",
    description: "Lead a team of talented developers building next-gen software solutions."
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "CloudScale",
    location: "Remote",
    salary: "$100k - $150k",
    type: "Full-time",
    level: "Mid-Level",
    description: "Manage and improve our cloud infrastructure and deployment pipelines."
  },
  {
    id: 7,
    title: "Junior Software Developer",
    company: "StartupHub",
    location: "Boston, MA",
    salary: "$70k - $90k",
    type: "Full-time",
    level: "Entry-Level",
    description: "Great opportunity for recent graduates to work on innovative projects."
  },
  {
    id: 8,
    title: "Mobile App Developer",
    company: "AppWorks",
    location: "Los Angeles, CA",
    salary: "$95k - $135k",
    type: "Full-time",
    level: "Mid-Level",
    description: "Develop mobile applications for iOS and Android platforms."
  },
  {
    id: 9,
    title: "Data Engineer",
    company: "DataFlow",
    location: "Chicago, IL",
    salary: "$110k - $160k",
    type: "Full-time",
    level: "Senior",
    description: "Design and implement data pipelines and analytics solutions."
  },
  {
    id: 10,
    title: "QA Engineer",
    company: "Quality First",
    location: "Remote",
    salary: "$80k - $110k",
    type: "Full-time",
    level: "Mid-Level",
    description: "Ensure software quality through automated and manual testing."
  },
  {
    id: 11,
    title: "Technical Writer",
    company: "DocuTech",
    location: "Portland, OR",
    salary: "$70k - $90k",
    type: "Full-time",
    level: "Mid-Level",
    description: "Create technical documentation and API references for our products."
  },
  {
    id: 12,
    title: "Backend Developer",
    company: "ServerPro",
    location: "Denver, CO",
    salary: "$100k - $140k",
    type: "Full-time",
    level: "Senior",
    description: "Develop and maintain backend services and APIs."
  },
  {
    id: 13,
    title: "UI/UX Designer",
    company: "DesignHub",
    location: "Miami, FL",
    salary: "$85k - $120k",
    type: "Full-time",
    level: "Mid-Level",
    description: "Create intuitive and beautiful user interfaces for web applications."
  },
  {
    id: 14,
    title: "Systems Administrator",
    company: "TechOps",
    location: "Remote",
    salary: "$90k - $130k",
    type: "Full-time",
    level: "Senior",
    description: "Manage and maintain our IT infrastructure and systems."
  },
  {
    id: 15,
    title: "Product Manager",
    company: "ProductLabs",
    location: "San Jose, CA",
    salary: "$130k - $180k",
    type: "Full-time",
    level: "Senior",
    description: "Lead product development and strategy for our tech products."
  },
  {
    id: 16,
    title: "Security Engineer",
    company: "SecureNet",
    location: "Washington, DC",
    salary: "$120k - $170k",
    type: "Full-time",
    level: "Senior",
    description: "Implement and maintain security measures across our infrastructure."
  },
  {
    id: 17,
    title: "Machine Learning Engineer",
    company: "AI Solutions",
    location: "Remote",
    salary: "$130k - $190k",
    type: "Full-time",
    level: "Senior",
    description: "Develop and deploy machine learning models for various applications."
  },
  {
    id: 18,
    title: "Technical Support Lead",
    company: "SupportHub",
    location: "Phoenix, AZ",
    salary: "$90k - $120k",
    type: "Full-time",
    level: "Mid-Level",
    description: "Lead a team of technical support specialists and improve support processes."
  },
  {
    id: 19,
    title: "Cloud Solutions Architect",
    company: "CloudArch",
    location: "Remote",
    salary: "$140k - $200k",
    type: "Full-time",
    level: "Senior",
    description: "Design and implement cloud-based solutions for enterprise clients."
  },
  {
    id: 20,
    title: "Full Stack Developer",
    company: "WebSolutions",
    location: "Austin, TX",
    salary: "$100k - $150k",
    type: "Full-time",
    level: "Mid-Level",
    description: "Build and maintain full-stack web applications using modern technologies."
  }
];

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || job.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Startup Jobs</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Find exciting opportunities at fast-growing startups.
        </p>

        <JobFilters
          searchQuery={searchQuery}
          selectedLevel={selectedLevel}
          onSearchChange={setSearchQuery}
          onLevelChange={setSelectedLevel}
        />

        <div className="grid gap-4">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Jobs;
