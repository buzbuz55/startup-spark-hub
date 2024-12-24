import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const CofounderMatching = () => {
  const [formData, setFormData] = useState({
    idea: "",
    skills: "",
    lookingFor: "",
    location: "",
    commitment: "full-time"
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Find Your Cofounder</h1>
            <p className="text-xl text-muted-foreground">
              Join Startup Nation's cofounder matching program to find the perfect partner for your startup journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">Why Find a Cofounder?</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Complementary skills and expertise</li>
                <li>• Shared workload and responsibilities</li>
                <li>• Better decision-making through collaboration</li>
                <li>• Increased chances of startup success</li>
                <li>• Access to broader networks</li>
              </ul>
            </Card>

            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">How It Works</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>1. Create your founder profile</li>
                <li>2. Browse potential cofounders</li>
                <li>3. Connect with matches</li>
                <li>4. Schedule introduction calls</li>
                <li>5. Start building together</li>
              </ul>
            </Card>
          </div>

          <Card className="p-8 mt-12">
            <h2 className="text-2xl font-semibold mb-6">Create Your Founder Profile</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Startup Idea</label>
                <Textarea 
                  placeholder="Describe your startup idea or the problem you want to solve"
                  value={formData.idea}
                  onChange={(e) => setFormData({...formData, idea: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Your Skills & Background</label>
                <Textarea 
                  placeholder="List your key skills, experience, and achievements"
                  value={formData.skills}
                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">What You're Looking For</label>
                <Textarea 
                  placeholder="Describe the ideal cofounder you're looking to partner with"
                  value={formData.lookingFor}
                  onChange={(e) => setFormData({...formData, lookingFor: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input 
                  placeholder="City, Country or Remote"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>

              <Button className="w-full">Submit Profile</Button>
            </form>
          </Card>

          <div className="text-center text-sm text-muted-foreground mt-8">
            <p>
              By submitting your profile, you agree to our matching process and community guidelines.
              We'll notify you when we find potential matches based on your criteria.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CofounderMatching;