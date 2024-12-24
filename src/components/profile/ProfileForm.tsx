import { Button } from "@/components/ui/button";
import { useState } from "react";
import { usePhoneVerification } from "@/hooks/usePhoneVerification";
import PhoneVerification from "./PhoneVerification";
import HobbiesInput from "./HobbiesInput";
import BasicInfoFields from "./form/BasicInfoFields";
import SocialLinks from "./form/SocialLinks";
import BioSection from "./form/BioSection";

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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <BasicInfoFields fullName={profile.full_name} email={profile.email} />

      <PhoneVerification
        phoneNumber={phoneNumber}
        onPhoneChange={setPhoneNumber}
        showOTPInput={showOTPInput}
        otp={otp}
        onOTPChange={setOTP}
        verificationInProgress={verificationInProgress}
        onVerifyOTP={handleVerifyOTP}
      />

      <BioSection
        bio={bio}
        fullName={profile.full_name}
        hobbies={hobbies}
        onBioChange={setBio}
      />

      <SocialLinks
        linkedinUrl={profile.linkedin_url}
        twitterUrl={profile.twitter_url}
        websiteUrl={profile.website_url}
      />

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