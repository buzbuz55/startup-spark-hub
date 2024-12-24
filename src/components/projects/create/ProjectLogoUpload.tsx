import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { FormSection } from "./FormSection";
import { toast } from "sonner";

interface ProjectLogoUploadProps {
  projectLogo: File | null;
  onLogoUpload: (file: File) => void;
}

export const ProjectLogoUpload = ({ projectLogo, onLogoUpload }: ProjectLogoUploadProps) => {
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Logo size should be less than 5MB");
        return;
      }
      onLogoUpload(file);
      toast.success("Logo uploaded successfully!");
    }
  };

  return (
    <FormSection title="Project Logo">
      <div className="flex items-center gap-4 mt-1">
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
          <Upload className="mr-2 h-4 w-4" />
          Upload Logo
        </Button>
        {projectLogo && (
          <span className="text-sm text-green-600">
            Logo uploaded: {projectLogo.name}
          </span>
        )}
      </div>
    </FormSection>
  );
};