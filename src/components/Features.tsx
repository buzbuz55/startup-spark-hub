import { MessageSquare, Video, Users, Rocket, Globe, School, GraduationCap, BookOpen, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";

const Features = () => {
  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Launch Your Dreams to the Moon! 🚀
        </h2>
        <p className="text-xl text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Connect, collaborate, and gain real-world experience with fellow student entrepreneurs from top universities worldwide
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow group hover:-translate-y-1 duration-300">
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <feature.icon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: GraduationCap,
    title: "Student Entrepreneurs",
    description: "Submit your innovative ideas and get matched with mentors, resources, and potential investors.",
  },
  {
    icon: Briefcase,
    title: "Internship Opportunities",
    description: "Find exciting internships at startups and gain hands-on experience in your field of interest.",
  },
  {
    icon: School,
    title: "University Network",
    description: "Connect with entrepreneurship clubs and programs from leading universities globally.",
  },
  {
    icon: BookOpen,
    title: "Learning Experience",
    description: "Access workshops, resources, and practical training to develop your entrepreneurial skills.",
  },
  {
    icon: Users,
    title: "Peer Collaboration",
    description: "Team up with talented students from diverse backgrounds and disciplines.",
  },
  {
    icon: Rocket,
    title: "Launch Your Career",
    description: "Build your portfolio with real projects and kickstart your entrepreneurial journey.",
  },
  {
    icon: MessageSquare,
    title: "Mentorship Chat",
    description: "Get guidance from experienced entrepreneurs and industry experts.",
  },
  {
    icon: Video,
    title: "Virtual Workshops",
    description: "Attend online sessions to learn from successful founders and industry leaders.",
  },
  {
    icon: Globe,
    title: "Global Community",
    description: "Join a worldwide network of student entrepreneurs and innovators.",
  },
];

export default Features;