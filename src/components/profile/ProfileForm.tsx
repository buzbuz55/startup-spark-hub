import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
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
  const [newHobby, setNewHobby] = useState("");
  const [hobbies, setHobbies] = useState<string[]>(profile.hobbies || []);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOTP] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(profile.phone_number || "");
  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const [bio, setBio] = useState(profile.bio || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    if (phoneNumber !== profile.phone_number && !showOTPInput) {
      try {
        setVerificationInProgress(true);
        const { error } = await supabase.auth.signInWithOtp({
          phone: phoneNumber,
        });
        
        if (error) throw error;
        
        setShowOTPInput(true);
        toast.success("OTP sent to your phone number");
      } catch (error) {
        console.error("Error sending OTP:", error);
        toast.error("Failed to send OTP. Please try again.");
      } finally {
        setVerificationInProgress(false);
      }
      return;
    }

    onProfileUpdate({
      full_name: formData.get('fullName') as string,
      phone_number: phoneNumber,
      linkedin_url: formData.get('linkedin') as string,
      twitter_url: formData.get('twitter') as string,
      website_url: formData.get('website') as string,
      hobbies: hobbies,
      bio: bio,
    });
  };

  const verifyOTP = async () => {
    try {
      setVerificationInProgress(true);
      const { error } = await supabase.auth.verifyOtp({
        phone: phoneNumber,
        token: otp,
        type: 'sms',
      });

      if (error) throw error;

      setShowOTPInput(false);
      toast.success("Phone number verified successfully");
      
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
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setVerificationInProgress(false);
    }
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

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
          disabled={showOTPInput || verificationInProgress}
        />
      </div>

      {showOTPInput && (
        <div className="space-y-2">
          <Label>Enter OTP</Label>
          <div className="flex flex-col space-y-2">
            <InputOTP
              value={otp}
              onChange={setOTP}
              maxLength={6}
              render={({ slots }) => (
                <InputOTPGroup className="gap-2">
                  {slots.map((slot, index) => (
                    <InputOTPSlot key={index} {...slot} index={index} />
                  ))}
                </InputOTPGroup>
              )}
            />
            <Button
              type="button"
              onClick={verifyOTP}
              disabled={otp.length !== 6 || verificationInProgress}
            >
              {verificationInProgress ? "Verifying..." : "Verify OTP"}
            </Button>
          </div>
        </div>
      )}

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