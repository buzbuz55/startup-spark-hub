import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import { ArrowRight, Building2, Users, Rocket, Trophy } from "lucide-react";

const Raise = () => {
  const [companyName, setCompanyName] = useState("");

  const testimonials = [
    {
      quote: "It's nice to be able to tell 207 people, 'This is your restaurant too. Promote it! Bring your parties here!' People feel so proud to be owners.",
      author: "Yuka Loroi",
      role: "Founder, Cassava"
    },
    {
      quote: "I hate convincing someone who doesn't believe what I'm building is valuable, when I have 100,000 people who are buying my products to let me know that it's valuable.",
      author: "Kim Lewis",
      role: "Founder, CurlMix"
    },
    {
      quote: "We wanted to give ownership to the community, so that when we're successful, they're successful.",
      author: "Immad Akhund",
      role: "Founder, Mercury"
    }
  ];

  const features = [
    {
      icon: <Building2 className="w-12 h-12 text-purple-500" />,
      title: "One line on your cap table",
      description: "We consolidate hundreds of investors into a single line on your cap table."
    },
    {
      icon: <Users className="w-12 h-12 text-purple-500" />,
      title: "Community-driven growth",
      description: "Turn your customers and supporters into passionate brand ambassadors."
    },
    {
      icon: <Rocket className="w-12 h-12 text-purple-500" />,
      title: "Set your own terms",
      description: "Take control of your raise using industry-standard tools and terms."
    },
    {
      icon: <Trophy className="w-12 h-12 text-purple-500" />,
      title: "Full support",
      description: "Our team helps with everything from strategy to legal compliance."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Let your community invest
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Raise $50K to $5M+ from hundreds of customers, fans, and friends—all in one line on your cap table.
          </p>
          
          <div className="max-w-md mx-auto space-y-4">
            <Input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="text-lg h-12"
            />
            <Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700">
              Get Started <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              We've raised $858M for community-led founders
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <blockquote className="text-lg mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.role}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            More than just a capital raise
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">
            Ready to let your community invest?
          </h2>
          <p className="text-xl mb-8">
            Turn hundreds of supporters into angel investors on your own terms.
          </p>
          <div className="max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="text-lg h-12 mb-4"
            />
            <Button 
              size="lg" 
              variant="secondary"
              className="w-full"
            >
              Get Started <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Raise;