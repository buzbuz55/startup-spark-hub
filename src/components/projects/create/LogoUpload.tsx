import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface LogoUploadProps {
  onLogoUpload: (file: File) => void;
}

export const LogoUpload = ({ onLogoUpload }: LogoUploadProps) => {
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Logo size should be less than 5MB");
        return;
      }
      onLogoUpload(file);
      toast.success("Logo uploaded successfully!");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
      <Input
        type="file"
        accept="image/*"
        onChange={handleLogoUpload}
        className="hidden"
        id="logo-upload"
      />
      <label htmlFor="logo-upload" className="flex flex-col items-center cursor-pointer">
        <Upload className="w-8 h-8 text-gray-400" />
        <span className="mt-2 text-sm text-gray-400">Drop or upload your company logo here</span>
      </label>
    </div>
  );
};