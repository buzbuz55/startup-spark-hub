import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SocialLinksProps {
  linkedinUrl: string | null;
  twitterUrl: string | null;
  websiteUrl: string | null;
}

const SocialLinks = ({ linkedinUrl, twitterUrl, websiteUrl }: SocialLinksProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn URL</Label>
        <Input
          id="linkedin"
          name="linkedin"
          type="url"
          defaultValue={linkedinUrl || ""}
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="twitter">Twitter URL</Label>
        <Input
          id="twitter"
          name="twitter"
          type="url"
          defaultValue={twitterUrl || ""}
          placeholder="https://twitter.com/yourhandle"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Personal Website</Label>
        <Input
          id="website"
          name="website"
          type="url"
          defaultValue={websiteUrl || ""}
          placeholder="https://yourwebsite.com"
        />
      </div>
    </>
  );
};

export default SocialLinks;