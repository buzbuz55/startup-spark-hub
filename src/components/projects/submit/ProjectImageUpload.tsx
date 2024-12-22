import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface ProjectImageUploadProps {
  onImageSelect: (file: File) => void;
}

const ProjectImageUpload = ({ onImageSelect }: ProjectImageUploadProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("Image size should be less than 5MB");
      return;
    }

    onImageSelect(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Project Image</label>
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="project-image"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById("project-image")?.click()}
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Image
        </Button>
        {imagePreview && (
          <div className="relative w-20 h-20">
            <img
              src={imagePreview}
              alt="Project preview"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500">
        Max file size: 5MB. Supported formats: PNG, JPG, JPEG
      </p>
    </div>
  );
};

export default ProjectImageUpload;