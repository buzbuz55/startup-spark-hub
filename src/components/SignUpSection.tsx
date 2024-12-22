import { Mail, Phone, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const SignUpSection = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for signing up! Check your email for confirmation.");
      setEmail("");
    }
  };

  const handlePhoneSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone) {
      toast.success("Thanks! We'll send you an SMS to get started.");
      setPhone("");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'StartupSparkHub',
        text: 'Join me on StartupSparkHub - The coolest platform for student entrepreneurs!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      toast.success("Link copied to clipboard!");
    }
  };

  const handleDownload = () => {
    toast.success("Coming soon to App Store and Play Store!");
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Join the Revolution! 🚀</h2>
            <p className="text-xl text-purple-200 mb-8">
              Connect with fellow entrepreneurs, build your dream team, and launch your next big idea!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Email Signup */}
            <form onSubmit={handleEmailSignup} className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button type="submit" className="bg-white text-purple-700 hover:bg-purple-100">
                  <Mail className="mr-2" />
                  Sign Up
                </Button>
              </div>
            </form>

            {/* Phone Signup */}
            <form onSubmit={handlePhoneSignup} className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="tel"
                  placeholder="Enter your phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button type="submit" className="bg-white text-purple-700 hover:bg-purple-100">
                  <Phone className="mr-2" />
                  Sign Up
                </Button>
              </div>
            </form>
          </div>

          <div className="flex justify-center gap-4 pt-8">
            <Button onClick={handleDownload} size="lg" className="bg-white text-purple-700 hover:bg-purple-100">
              <Download className="mr-2" />
              Download App
            </Button>
            <Button onClick={handleShare} size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Share2 className="mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpSection;