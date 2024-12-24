import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import AiBioGenerator from "../AiBioGenerator";

interface BioSectionProps {
  bio: string;
  fullName: string;
  hobbies: string[];
  onBioChange: (bio: string) => void;
}

const BioSection = ({ bio, fullName, hobbies, onBioChange }: BioSectionProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="bio">Bio</Label>
        <AiBioGenerator
          currentBio={bio}
          fullName={fullName}
          hobbies={hobbies}
          onBioGenerated={onBioChange}
        />
      </div>
      <Textarea
        id="bio"
        name="bio"
        value={bio}
        onChange={(e) => onBioChange(e.target.value)}
        placeholder="Tell us about yourself"
        className="h-24"
      />
    </div>
  );
};

export default BioSection;