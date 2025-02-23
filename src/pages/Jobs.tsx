import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Building2, DollarSign } from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  level: string;
  description: string;
}

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
  const [selectedLevel, setSelectedLevel] = useState<string>("");

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

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search jobs by title, company, or keywords"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Experience Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Entry-Level">Entry Level</SelectItem>
              <SelectItem value="Mid-Level">Mid Level</SelectItem>
              <SelectItem value="Senior">Senior</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          {filteredJobs.map(job => (
            <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-1" />
                      {job.company}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {job.salary}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Badge variant="secondary">{job.type}</Badge>
                  <Badge>{job.level}</Badge>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">{job.description}</p>
              <Button>Apply Now</Button>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Jobs;
