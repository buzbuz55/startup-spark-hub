import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket } from "lucide-react";
import { toast } from "sonner";

const VCProfileForm = () => {
  const [formData, setFormData] = useState({
    firmName: "",
    website: "",
    email: "",
    phone: "",
    fundSize: "",
    investmentStage: "",
    portfolio: "",
    bio: "",
    linkedIn: "",
    twitter: "",
    preferredSectors: "",
    investmentThesis: "",
    geographicFocus: "",
    minimumCheckSize: "",
    maximumCheckSize: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully! 🚀");
  };

  return (
    <Card className="lg:col-span-2 bg-white/10 border-white/20 backdrop-blur-sm text-white">
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
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Minimum Check Size</label>
                      <Input
                        placeholder="e.g., $250K"
                        value={formData.minimumCheckSize}
                        onChange={(e) => setFormData({ ...formData, minimumCheckSize: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Maximum Check Size</label>
                      <Input
                        placeholder="e.g., $2M"
                        value={formData.maximumCheckSize}
                        onChange={(e) => setFormData({ ...formData, maximumCheckSize: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Preferred Sectors</label>
                    <Input
                      placeholder="e.g., AI/ML, Blockchain, FinTech"
                      value={formData.preferredSectors}
                      onChange={(e) => setFormData({ ...formData, preferredSectors: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Geographic Focus</label>
                    <Input
                      placeholder="e.g., North America, Europe, Global"
                      value={formData.geographicFocus}
                      onChange={(e) => setFormData({ ...formData, geographicFocus: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Investment Thesis</label>
                    <Textarea
                      placeholder="Describe your investment philosophy and what you look for in startups"
                      value={formData.investmentThesis}
                      onChange={(e) => setFormData({ ...formData, investmentThesis: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[100px]"
                    />
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
          </div>
          <div className="flex justify-end">
            <Button type="submit" size="lg" className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700">
              Save Profile 🚀
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default VCProfileForm;
