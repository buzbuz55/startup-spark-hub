import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, TrendingUp, Users, Rocket, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const Blog = () => {
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
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-bold text-3xl text-purple-600 mb-2">500+</h3>
                <p className="text-gray-600">Startups Launched</p>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg">
                <h3 className="font-bold text-3xl text-pink-600 mb-2">$10M+</h3>
                <p className="text-gray-600">Funding Raised</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-bold text-3xl text-blue-600 mb-2">20K+</h3>
                <p className="text-gray-600">Active Members</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-bold text-3xl text-green-600 mb-2">95%</h3>
                <p className="text-gray-600">Success Rate</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Success Story: TechStart Revolution</CardTitle>
                <CardDescription>Posted on March 15, 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  From a simple idea to a $2M seed round - see how our platform helped TechStart revolutionize the EdTech space. Their journey showcases the power of our community and mentorship program.
                </p>
                <Button variant="link" className="group">
                  Read More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How We Help Startups Succeed</CardTitle>
                <CardDescription>Posted on March 10, 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Our comprehensive approach combines mentorship, networking, and resources to give startups the best chance of success. Learn about our proven methodology and why it works.
                </p>
                <Button variant="link" className="group">
                  Read More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Funding Success: Q1 2024 Report</CardTitle>
                <CardDescription>Posted on March 5, 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  This quarter saw unprecedented success with our startups raising over $5M in combined funding. Dive into the numbers and learn what made these startups stand out.
                </p>
                <Button variant="link" className="group">
                  Read More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;