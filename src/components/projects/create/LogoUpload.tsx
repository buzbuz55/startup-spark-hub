import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface LogoUploadProps {
  onLogoUpload: (file: File) => void;
}

export const LogoUpload = ({ onLogoUpload }: LogoUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Logo size should be less than 5MB");
        return;
      }
      onLogoUpload(file);
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      toast.success("Logo uploaded successfully!");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-purple-500 transition-colors relative">
      <Input
        type="file"
        accept="image/*"
        onChange={handleLogoUpload}
        className="hidden"
        id="logo-upload"
      />
      {previewUrl ? (
        <div className="w-full h-full flex items-center justify-center">
          <img 
            src={previewUrl} 
            alt="Project logo" 
            className="max-h-28 max-w-28 object-contain"
          />
        </div>
      ) : (
        <label htmlFor="logo-upload" className="flex flex-col items-center cursor-pointer">
          <Upload className="w-8 h-8 text-gray-400" />
          <span className="mt-2 text-sm text-gray-400">Drop or upload your company logo here</span>
        </label>
      )}
    </div>
  );
};