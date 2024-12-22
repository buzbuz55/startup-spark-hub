import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserCircle, Upload, Trash, Image } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AvatarUploadProps {
  avatarUrl: string;
  fullName: string;
  onAvatarUpdate: (url: string | null) => void;
}

const AvatarUpload = ({ avatarUrl, fullName, onAvatarUpdate }: AvatarUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');

  const sizeClasses = {
    small: 'h-24 w-24',
    medium: 'h-32 w-32',
    large: 'h-40 w-40',
  };

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

  const handleRemoveAvatar = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      await supabase
        .from('profiles')
        .update({ avatar_url: null })
        .eq('id', user.id);

      onAvatarUpdate(null);
      toast.success("Profile photo removed");
    } catch (error) {
      console.error('Error removing avatar:', error);
      toast.error("Error removing profile photo");
    }
  };

  return (
    <div className="mb-6 flex flex-col items-center">
      <Avatar className={`mb-4 ${sizeClasses[size]}`}>
        <AvatarImage src={avatarUrl} alt={fullName} />
        <AvatarFallback>
          <UserCircle className="w-20 h-20" />
        </AvatarFallback>
      </Avatar>
      
      <div className="flex gap-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSize('small')}
          className={size === 'small' ? 'bg-primary text-primary-foreground' : ''}
        >
          Small
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSize('medium')}
          className={size === 'medium' ? 'bg-primary text-primary-foreground' : ''}
        >
          Medium
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSize('large')}
          className={size === 'large' ? 'bg-primary text-primary-foreground' : ''}
        >
          Large
        </Button>
      </div>

      <div className="flex gap-2">
        <Label htmlFor="photo" className="cursor-pointer">
          <div className="flex items-center gap-2 text-sm text-primary hover:text-primary/80">
            <Upload className="w-4 h-4" />
            {uploading ? "Uploading..." : "Change Photo"}
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

        {avatarUrl && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemoveAvatar}
            className="text-destructive hover:text-destructive/80"
          >
            <Trash className="w-4 h-4 mr-2" />
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};

export default AvatarUpload;