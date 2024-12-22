import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";
import BlogHeader from "@/components/blog/BlogHeader";
import StartupProgressForm from "@/components/blog/StartupProgressForm";
import { BlogPost } from "@/types/blog";

const Blog = () => {
  const blogPosts: BlogPost[] = [
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
    },
    {
      title: "AI Tech: The Future is Now – Learn, Build, and Grow",
      date: "March 25, 2024",
      readTime: "7 min read",
      author: "David Chen",
      description: "In today's digital age, AI technology is at the forefront of innovation. Learn the latest AI tools, build your own startup, and collaborate with global innovators.",
      category: "AI & Technology"
    },
    {
      title: "Build Your Startup with AI – The World's #1 Platform for Entrepreneurs",
      date: "March 24, 2024",
      readTime: "6 min read",
      author: "Lisa Wang",
      description: "Dreaming of launching your own business? With our platform, you can submit your ideas, get mentorship from the best, and collaborate with entrepreneurs from all around the world.",
      category: "Entrepreneurship"
    },
    {
      title: "Zoom Into Success: Learn from the Best with AI-Powered Courses",
      date: "March 23, 2024",
      readTime: "5 min read",
      author: "Mark Johnson",
      description: "Join interactive online classes and workshops from industry experts. Zoom in on your passion for AI, coding, and business.",
      category: "Education"
    },
    {
      title: "Collaborate Globally: Build Your MVP with AI and Innovation",
      date: "March 22, 2024",
      readTime: "8 min read",
      author: "Sarah Zhang",
      description: "Start building your Minimum Viable Product (MVP) with AI and cutting-edge tools. Collaborate with like-minded innovators worldwide.",
      category: "Innovation"
    },
    {
      title: "Turn Your Ideas into Money: The AI Platform for Entrepreneurs",
      date: "March 21, 2024",
      readTime: "6 min read",
      author: "Ryan Peters",
      description: "The world's most innovative platform is here! Learn how to leverage AI to make money, build your business, and scale your startup.",
      category: "Business"
    },
    {
      title: "Make Your Mark in 2025: Get Your App Ready for the Future",
      date: "March 20, 2024",
      readTime: "7 min read",
      author: "Emily Torres",
      description: "2025 will be the year of breakthrough apps. Could your app be the next big thing? With AI tools and global collaboration, you can turn your app idea into reality.",
      category: "Future Tech"
    },
    {
      title: "Startup Squad: Your Dream Team for Building the Future",
      date: "March 19, 2024",
      readTime: "6 min read",
      author: "Michael Chang",
      description: "Join the Startup Squad, a global community of innovators, dreamers, and doers. With AI-driven tools, mentorship, and collaborative opportunities.",
      category: "Community"
    },
    {
      title: "The #1 Platform to Launch Your Startup: AI Tools and Global Collaboration",
      date: "March 18, 2024",
      readTime: "7 min read",
      author: "Jessica Lee",
      description: "Looking to create the next big thing? The world's #1 startup platform gives you access to AI-powered resources and real-time feedback from investors.",
      category: "Platform"
    },
    {
      title: "AI & Startup Tech: The Ultimate Blueprint for Success",
      date: "March 17, 2024",
      readTime: "8 min read",
      author: "Alex Rivera",
      description: "Learn how AI can help you build a successful startup. From automation and data analysis to smart app development and global collaboration.",
      category: "Strategy"
    },
    {
      title: "AI + Startup Squad: Your Pathway to Venture Capital",
      date: "March 16, 2024",
      readTime: "6 min read",
      author: "Sophie Wilson",
      description: "Step into the world of venture capital with AI-driven solutions that take your startup from concept to funding. Startup Squad helps you connect with investors.",
      category: "Funding"
    },
    {
      title: "The World's Greatest Tech Center: Build, Innovate, and Scale",
      date: "March 15, 2024",
      readTime: "7 min read",
      author: "Daniel Kim",
      description: "Join the world's greatest tech center where innovation thrives. Learn from experts, create AI-powered solutions, and collaborate with like-minded people across the globe.",
      category: "Innovation"
    },
    {
      title: "2025: The Year of Breakthrough Apps – Will You Be Ready?",
      date: "March 14, 2024",
      readTime: "5 min read",
      author: "Rachel Chen",
      description: "The tech world is waiting for the next groundbreaking app. Will yours be the one? Leverage AI tools, build with the Startup Squad, and create an MVP.",
      category: "Future Tech"
    },
    {
      title: "Learn to Make Money: Start Your Journey with AI-Powered Tools",
      date: "March 13, 2024",
      readTime: "6 min read",
      author: "Tom Anderson",
      description: "Making money through entrepreneurship has never been easier. With AI-powered tools, online courses, and access to a global community.",
      category: "Business"
    },
    {
      title: "From Classroom to Startup: How AI and Innovation are Changing the Game",
      date: "March 12, 2024",
      readTime: "7 min read",
      author: "Maya Patel",
      description: "From high school to college, the tools you need to succeed as an entrepreneur are now at your fingertips. Our platform gives you access to AI-driven startup tools.",
      category: "Education"
    },
    {
      title: "Transform Your Ideas into Reality: The Ultimate Startup Hub for Students",
      date: "March 11, 2024",
      readTime: "6 min read",
      author: "Chris Martinez",
      description: "Take your entrepreneurial spirit to the next level with our platform, designed specifically for students and recent grads.",
      category: "Platform"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <BlogHeader />
          
          <div className="flex justify-center">
            <StartupProgressForm />
          </div>

          <div className="grid gap-8">
            {blogPosts.map((post, index) => (
              <BlogCard key={index} post={post} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
