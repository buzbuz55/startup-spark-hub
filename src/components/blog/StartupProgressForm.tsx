import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Video } from "lucide-react";
import { toast } from "sonner";

const StartupProgressForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    media: null as File | null,
  });

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        toast.error("File size should be less than 100MB");
        return;
      }
      setFormData({ ...formData, media: file });
      toast.success("Media file uploaded successfully!");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Progress submission:", formData);
    toast.success("Thank you for sharing your startup progress!");
    setFormData({
      title: "",
      description: "",
      media: null,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-8">
          <Video className="mr-2 h-4 w-4" />
          Share Your Startup Progress
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Your Startup Journey</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="What's new with your startup?"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Tell us about your progress..."
              className="min-h-[100px]"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Upload Media (Image/Video)</label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*,video/*"
                onChange={handleMediaUpload}
                className="hidden"
                id="media-upload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("media-upload")?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Media
              </Button>
              {formData.media && (
                <span className="text-sm text-green-600">
                  File uploaded: {formData.media.name}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Max file size: 100MB. Supported formats: images and videos
            </p>
          </div>
          <Button type="submit" className="w-full">Submit Progress</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StartupProgressForm;