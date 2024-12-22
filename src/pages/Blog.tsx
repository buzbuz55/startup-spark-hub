import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, BookOpen, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const blogPosts = [
    {
      title: "Why Startup Squad is the Best App for University Students to Raise VC Funding",
      date: "March 20, 2024",
      readTime: "8 min read",
      author: "Sarah Chen",
      description: "Universities are full of talented, ambitious students, but turning an idea into a successful startup often requires one thing: funding. Discover how Startup Squad is changing the game.",
      category: "Funding"
    },
    {
      title: "How Startup Squad is Revolutionizing Startup Funding for University Entrepreneurs",
      date: "March 18, 2024",
      readTime: "6 min read",
      author: "Michael Roberts",
      description: "University entrepreneurs no longer need to struggle with finding funding for their projects. Learn how Startup Squad bridges the gap between students and top-tier venture capitalists.",
      category: "Innovation"
    },
    {
      title: "From Campus to Capital: Using Startup Squad to Get VC Funding",
      date: "March 15, 2024",
      readTime: "7 min read",
      author: "David Kumar",
      description: "Are you a college student with a groundbreaking idea but no idea how to get VC funding? This comprehensive guide shows you how to leverage Startup Squad effectively.",
      category: "Guide"
    },
    {
      title: "Why VCs Love Startup Squad: The Ultimate App for University Entrepreneurs",
      date: "March 12, 2024",
      readTime: "5 min read",
      author: "Jessica Wong",
      description: "Venture capitalists are always on the lookout for innovative, high-potential startups. Find out why VCs are flocking to Startup Squad to discover their next big investment.",
      category: "Insights"
    },
    {
      title: "Unlocking Funding for Your University Startup: How Startup Squad Helps",
      date: "March 10, 2024",
      readTime: "6 min read",
      author: "Alex Thompson",
      description: "Learn how to leverage AI-powered pitch decks, mentorship from successful entrepreneurs, and networking with investors to raise capital for your startup.",
      category: "Guide"
    },
    {
      title: "How Startup Squad is Changing the Game for University Startup Funding",
      date: "March 8, 2024",
      readTime: "7 min read",
      author: "Rachel Kim",
      description: "Explore how this revolutionary platform is transforming the way universities approach startup funding and connecting students with venture capital opportunities.",
      category: "Innovation"
    },
    {
      title: "University Entrepreneurs: How Startup Squad Connects You to Venture Capital",
      date: "March 5, 2024",
      readTime: "5 min read",
      author: "Tom Martinez",
      description: "Ready to take your university startup to the next level? Discover how Startup Squad's user-friendly interface and investor network can help you secure funding.",
      category: "Guide"
    },
    {
      title: "From Startup Idea to VC Investment: The Power of Startup Squad",
      date: "March 3, 2024",
      readTime: "6 min read",
      author: "Emma Wilson",
      description: "Getting VC investment as a university student is now simpler than ever. Learn about the AI-driven tools and global networking opportunities available through Startup Squad.",
      category: "Success Stories"
    },
    {
      title: "The Secret to Getting VC Funding as a University Student: Startup Squad",
      date: "March 1, 2024",
      readTime: "7 min read",
      author: "James Chen",
      description: "Discover how students at top universities are using Startup Squad to connect with VCs and secure the funding needed to launch successful startups.",
      category: "Strategy"
    },
    {
      title: "Startup Squad: The Top App for University Students Looking to Attract VC Funding",
      date: "February 28, 2024",
      readTime: "6 min read",
      author: "Sofia Rodriguez",
      description: "Learn why Startup Squad has become the leading platform for university entrepreneurs seeking to raise capital and build the next big company.",
      category: "Platform"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Empowering the Next Generation of Startups
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join the community that has helped launch over 500 successful startups and raised millions in funding
            </p>
          </div>

          <div className="grid gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <span className="inline-block px-3 py-1 text-sm font-medium text-purple-600 bg-purple-100 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <CardTitle className="text-2xl font-bold hover:text-purple-600 transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {post.description}
                  </p>
                  <Button variant="link" className="group p-0">
                    Read More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;