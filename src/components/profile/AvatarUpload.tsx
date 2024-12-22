import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserCircle, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AvatarUploadProps {
  avatarUrl: string;
  fullName: string;
  onAvatarUpdate: (url: string) => void;
}

const AvatarUpload = ({ avatarUrl, fullName, onAvatarUpdate }: AvatarUploadProps) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      onAvatarUpdate(publicUrl);
      toast.success("Profile photo updated");
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error("Error uploading profile photo");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-6 flex flex-col items-center">
      <Avatar className="h-32 w-32 mb-4">
        <AvatarImage src={avatarUrl} alt={fullName} />
        <AvatarFallback>
          <UserCircle className="w-20 h-20" />
        </AvatarFallback>
      </Avatar>
      <Label htmlFor="photo" className="cursor-pointer">
        <div className="flex items-center gap-2 text-sm text-primary hover:text-primary/80">
          <Upload className="w-4 h-4" />
          {uploading ? "Uploading..." : "Change Profile Photo"}
        </div>
        <Input
          id="photo"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
          disabled={uploading}
        />
      </Label>
    </div>
  );
};

export default AvatarUpload;