import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormSection } from "./FormSection";

interface ProjectGoalsProps {
  formData: {
    goal: string;
    targetAudience: string;
    timeline: string;
    fundingNeeded: string;
  };
  onChange: (data: Partial<{
    goal: string;
    targetAudience: string;
    timeline: string;
    fundingNeeded: string;
  }>) => void;
}

export const ProjectGoals = ({ formData, onChange }: ProjectGoalsProps) => {
  return (
    <FormSection title="Project Goals">
      <div className="space-y-4">
        <div>
          <Label>Project Goal</Label>
          <Textarea
            value={formData.goal}
            onChange={(e) => onChange({ goal: e.target.value })}
            placeholder="What are you trying to achieve?"
            required
          />
        </div>

        <div>
          <Label>Target Audience</Label>
          <Input
            value={formData.targetAudience}
            onChange={(e) => onChange({ targetAudience: e.target.value })}
            placeholder="Who is this project for?"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Timeline</Label>
            <Input
              value={formData.timeline}
              onChange={(e) => onChange({ timeline: e.target.value })}
              placeholder="Expected timeline"
              required
            />
          </div>

          <div>
            <Label>Funding Needed</Label>
            <Input
              type="number"
              value={formData.fundingNeeded}
              onChange={(e) => onChange({ fundingNeeded: e.target.value })}
              placeholder="Amount in USD"
            />
          </div>
        </div>
      </div>
    </FormSection>
  );
};