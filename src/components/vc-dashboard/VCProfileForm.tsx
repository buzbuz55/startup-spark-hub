import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Globe, Mail, Phone, Briefcase, Target, Users, MapPin, DollarSign, LineChart, LinkedinIcon, TwitterIcon } from "lucide-react";
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
    toast.success("Profile updated successfully!", {
      description: "Your VC firm profile has been saved."
    });
  };

  const InputWithIcon = ({ icon: Icon, label, value, onChange, placeholder, type = "text" }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
        <Icon className="w-4 h-4" />
        {label}
      </label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:ring-purple-500"
      />
    </div>
  );

  return (
    <Card className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 border-white/10 shadow-xl backdrop-blur-sm text-white">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          VC Firm Profile
        </CardTitle>
        <p className="text-gray-400">Manage your venture capital firm's presence and investment criteria</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <InputWithIcon
              icon={Building2}
              label="Firm Name"
              placeholder="Enter your firm name"
              value={formData.firmName}
              onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
            />
            <InputWithIcon
              icon={Globe}
              label="Website"
              placeholder="https://example.com"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
            <InputWithIcon
              icon={Mail}
              label="Email"
              type="email"
              placeholder="contact@vcfirm.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <InputWithIcon
              icon={Phone}
              label="Phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <InputWithIcon
              icon={Briefcase}
              label="Fund Size"
              placeholder="e.g., $50M"
              value={formData.fundSize}
              onChange={(e) => setFormData({ ...formData, fundSize: e.target.value })}
            />
            <InputWithIcon
              icon={Target}
              label="Investment Stage"
              placeholder="e.g., Seed, Series A"
              value={formData.investmentStage}
              onChange={(e) => setFormData({ ...formData, investmentStage: e.target.value })}
            />
            <InputWithIcon
              icon={DollarSign}
              label="Minimum Check Size"
              placeholder="e.g., $250K"
              value={formData.minimumCheckSize}
              onChange={(e) => setFormData({ ...formData, minimumCheckSize: e.target.value })}
            />
            <InputWithIcon
              icon={DollarSign}
              label="Maximum Check Size"
              placeholder="e.g., $2M"
              value={formData.maximumCheckSize}
              onChange={(e) => setFormData({ ...formData, maximumCheckSize: e.target.value })}
            />
          </div>

          <div className="space-y-4">
            <InputWithIcon
              icon={Users}
              label="Preferred Sectors"
              placeholder="e.g., AI/ML, Blockchain, FinTech"
              value={formData.preferredSectors}
              onChange={(e) => setFormData({ ...formData, preferredSectors: e.target.value })}
            />

            <InputWithIcon
              icon={MapPin}
              label="Geographic Focus"
              placeholder="e.g., North America, Europe, Global"
              value={formData.geographicFocus}
              onChange={(e) => setFormData({ ...formData, geographicFocus: e.target.value })}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <InputWithIcon
                icon={LinkedinIcon}
                label="LinkedIn Profile"
                placeholder="LinkedIn URL"
                value={formData.linkedIn}
                onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
              />
              <InputWithIcon
                icon={TwitterIcon}
                label="Twitter Profile"
                placeholder="Twitter URL"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
                <LineChart className="w-4 h-4" />
                Investment Thesis
              </label>
              <Textarea
                placeholder="Describe your investment philosophy and what you look for in startups"
                value={formData.investmentThesis}
                onChange={(e) => setFormData({ ...formData, investmentThesis: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[100px] focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Portfolio Companies
              </label>
              <Textarea
                placeholder="List your current portfolio companies"
                value={formData.portfolio}
                onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[100px] focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold px-8 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Save Profile
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default VCProfileForm;