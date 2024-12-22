import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";

interface ProfileFormProps {
  profile: {
    full_name: string;
    email: string;
    phone_number: string;
    linkedin_url: string | null;
    twitter_url: string | null;
    website_url: string | null;
    hobbies: string[] | null;
    bio: string | null;
  };
  loading: boolean;
  onProfileUpdate: (values: {
    full_name: string;
    phone_number: string;
    linkedin_url: string | null;
    twitter_url: string | null;
    website_url: string | null;
    hobbies: string[];
    bio: string | null;
  }) => void;
  onCancel: () => void;
}

const ProfileForm = ({ profile, loading, onProfileUpdate, onCancel }: ProfileFormProps) => {
  const [newHobby, setNewHobby] = useState("");
  const [hobbies, setHobbies] = useState<string[]>(profile.hobbies || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    onProfileUpdate({
      full_name: formData.get('fullName') as string,
      phone_number: formData.get('phone') as string,
      linkedin_url: formData.get('linkedin') as string,
      twitter_url: formData.get('twitter') as string,
      website_url: formData.get('website') as string,
      hobbies: hobbies,
      bio: formData.get('bio') as string,
    });
  };

  const addHobby = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newHobby.trim()) {
      e.preventDefault();
      if (!hobbies.includes(newHobby.trim())) {
        setHobbies([...hobbies, newHobby.trim()]);
      }
      setNewHobby("");
    }
  };

  const removeHobby = (hobby: string) => {
    setHobbies(hobbies.filter(h => h !== hobby));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          defaultValue={profile.full_name}
          placeholder="Enter your full name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={profile.email}
          disabled
          className="bg-muted"
        />
        <p className="text-sm text-muted-foreground">
          Email cannot be changed
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          defaultValue={profile.phone_number}
          placeholder="Enter your phone number"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          defaultValue={profile.bio || ""}
          placeholder="Tell us about yourself"
          className="h-24"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn URL</Label>
        <Input
          id="linkedin"
          name="linkedin"
          type="url"
          defaultValue={profile.linkedin_url || ""}
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="twitter">Twitter URL</Label>
        <Input
          id="twitter"
          name="twitter"
          type="url"
          defaultValue={profile.twitter_url || ""}
          placeholder="https://twitter.com/yourhandle"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Personal Website</Label>
        <Input
          id="website"
          name="website"
          type="url"
          defaultValue={profile.website_url || ""}
          placeholder="https://yourwebsite.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="hobbies">Hobbies</Label>
        <Input
          id="hobbies"
          value={newHobby}
          onChange={(e) => setNewHobby(e.target.value)}
          onKeyDown={addHobby}
          placeholder="Type a hobby and press Enter"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {hobbies.map((hobby) => (
            <Badge key={hobby} variant="secondary" className="gap-1">
              {hobby}
              <button
                type="button"
                onClick={() => removeHobby(hobby)}
                className="ml-1 hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;