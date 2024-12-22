import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Building2, Users, Briefcase } from "lucide-react";
import { toast } from "sonner";

const SubmitIdea = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    logo: null as File | null,
    about: "",
    projectDetails: "",
    lookingFor: [] as string[],
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      setFormData({ ...formData, logo: file });
      toast.success("Logo uploaded successfully!");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would typically connect to a backend
    console.log("Form submitted:", formData);
    toast.success("Your idea has been submitted successfully!");
  };

  const toggleLookingFor = (option: string) => {
    setFormData(prev => ({
      ...prev,
      lookingFor: prev.lookingFor.includes(option)
        ? prev.lookingFor.filter(item => item !== option)
        : [...prev.lookingFor, option]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="relative h-48">
          <img
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
            alt="Submit Your Idea"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white">Submit Your Idea</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Company Name</label>
            <Input
              required
              placeholder="Enter your company name"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Company Logo</label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("logo-upload")?.click()}
              >
                <Upload className="mr-2" />
                Upload Logo
              </Button>
              {formData.logo && (
                <span className="text-sm text-green-600">Logo uploaded: {formData.logo.name}</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">About Your Company</label>
            <Textarea
              required
              placeholder="Tell us about your company..."
              value={formData.about}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Project Details</label>
            <Textarea
              required
              placeholder="Describe your project, goals, and current stage..."
              value={formData.projectDetails}
              onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
              className="min-h-[150px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">I'm Looking For</label>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Building2, label: "VC Funding" },
                { icon: Users, label: "Co-Founder" },
                { icon: Briefcase, label: "Hiring" },
                { icon: Users, label: "Freelancers" }
              ].map(({ icon: Icon, label }) => (
                <Button
                  key={label}
                  type="button"
                  variant={formData.lookingFor.includes(label) ? "default" : "outline"}
                  onClick={() => toggleLookingFor(label)}
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Button>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            Submit Your Idea
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SubmitIdea;