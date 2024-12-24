import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BasicInfoFieldsProps {
  fullName: string;
  email: string;
}

const BasicInfoFields = ({ fullName, email }: BasicInfoFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          defaultValue={fullName}
          placeholder="Enter your full name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          disabled
          className="bg-muted"
        />
        <p className="text-sm text-muted-foreground">
          Email cannot be changed
        </p>
      </div>
    </>
  );
};

export default BasicInfoFields;