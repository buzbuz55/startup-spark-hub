import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Globe, Phone, Mail, Wallet, Trophy, Target, Rocket } from "lucide-react";
import { toast } from "sonner";

const VCDashboard = () => {
  const [formData, setFormData] = useState({
    firmName: "",
    website: "",
    email: "",
    phone: "",
    fundSize: "",
    investmentStage: "",
    portfolio: "",
    bio: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully! 🎉");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Dashboard Header */}
          <div className="text-center text-white mb-12">
            <h1 className="text-4xl font-bold mb-4">VC Dashboard 🚀</h1>
            <p className="text-xl text-purple-200">Manage your venture capital profile and discover promising startups</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { title: "Portfolio Companies", value: "12", icon: <Building2 />, color: "bg-purple-500" },
              { title: "Total Investments", value: "$8.5M", icon: <Wallet />, color: "bg-blue-500" },
              { title: "Success Exits", value: "3", icon: <Trophy />, color: "bg-green-500" },
              { title: "Active Deals", value: "5", icon: <Target />, color: "bg-orange-500" }
            ].map((stat, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm text-white">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm text-purple-200">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    {stat.icon}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Profile Form */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-6 h-6" />
                VC Firm Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Firm Name</label>
                    <Input
                      placeholder="Enter your firm name"
                      value={formData.firmName}
                      onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Website</label>
                    <Input
                      placeholder="https://example.com"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      placeholder="contact@vcfirm.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Fund Size</label>
                    <Input
                      placeholder="e.g., $50M"
                      value={formData.fundSize}
                      onChange={(e) => setFormData({ ...formData, fundSize: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Investment Stage</label>
                    <Input
                      placeholder="e.g., Seed, Series A"
                      value={formData.investmentStage}
                      onChange={(e) => setFormData({ ...formData, investmentStage: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Portfolio Companies</label>
                  <Textarea
                    placeholder="List your current portfolio companies"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Bio & Investment Thesis</label>
                  <Textarea
                    placeholder="Tell us about your investment philosophy and areas of interest"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[150px]"
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" size="lg" className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700">
                    Save Profile 🚀
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VCDashboard;