import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { usePhoneVerification } from "@/hooks/usePhoneVerification";
import PhoneVerification from "./PhoneVerification";
import HobbiesInput from "./HobbiesInput";
import AiBioGenerator from "./AiBioGenerator";

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
  const [hobbies, setHobbies] = useState<string[]>(profile.hobbies || []);
  const [bio, setBio] = useState(profile.bio || "");
  
  const {
    phoneNumber,
    setPhoneNumber,
    showOTPInput,
    otp,
    setOTP,
    verificationInProgress,
    sendOTP,
    verifyOTP,
  } = usePhoneVerification(profile.phone_number || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    if (phoneNumber !== profile.phone_number && !showOTPInput) {
      const success = await sendOTP();
      if (!success) return;
    }

    if (!showOTPInput) {
      onProfileUpdate({
        full_name: formData.get('fullName') as string,
        phone_number: phoneNumber,
        linkedin_url: formData.get('linkedin') as string,
        twitter_url: formData.get('twitter') as string,
        website_url: formData.get('website') as string,
        hobbies: hobbies,
        bio: bio,
      });
    }
  };

  const handleVerifyOTP = async () => {
    const success = await verifyOTP();
    if (success) {
      const formElement = document.querySelector('form') as HTMLFormElement;
      const formData = new FormData(formElement);
      onProfileUpdate({
        full_name: formData.get('fullName') as string,
        phone_number: phoneNumber,
        linkedin_url: formData.get('linkedin') as string,
        twitter_url: formData.get('twitter') as string,
        website_url: formData.get('website') as string,
        hobbies: hobbies,
        bio: bio,
      });
    }
  };

  const handleBioGenerated = (generatedBio: string) => {
    setBio(generatedBio);
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

      <PhoneVerification
        phoneNumber={phoneNumber}
        onPhoneChange={setPhoneNumber}
        showOTPInput={showOTPInput}
        otp={otp}
        onOTPChange={setOTP}
        verificationInProgress={verificationInProgress}
        onVerifyOTP={handleVerifyOTP}
      />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="bio">Bio</Label>
          <AiBioGenerator
            currentBio={bio}
            fullName={profile.full_name}
            hobbies={hobbies}
            onBioGenerated={handleBioGenerated}
          />
        </div>
        <Textarea
          id="bio"
          name="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
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

      <HobbiesInput hobbies={hobbies} onChange={setHobbies} />

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={loading || verificationInProgress || (phoneNumber !== profile.phone_number && !showOTPInput)}
        >
          {loading ? "Saving..." : (phoneNumber !== profile.phone_number && !showOTPInput) ? "Send OTP" : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;