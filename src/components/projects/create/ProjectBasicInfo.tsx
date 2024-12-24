import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormSection } from "./FormSection";

interface ProjectBasicInfoProps {
  formData: {
    title: string;
    description: string;
  };
  onChange: (data: Partial<{ title: string; description: string }>) => void;
}

export const ProjectBasicInfo = ({ formData, onChange }: ProjectBasicInfoProps) => {
  return (
    <FormSection title="Basic Information">
      <div className="space-y-4">
        <div>
          <Label>Project Title</Label>
          <Input
            value={formData.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="Enter your project title"
            required
          />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            value={formData.description}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="Describe your project"
            className="min-h-[100px]"
            required
          />
        </div>
      </div>
    </FormSection>
  );
};