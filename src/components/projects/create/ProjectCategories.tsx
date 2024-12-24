import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormSection } from "./FormSection";

interface ProjectCategoriesProps {
  formData: {
    category: string;
    teamSize: string;
    stage: string;
    location: string;
  };
  onChange: (data: Partial<{
    category: string;
    teamSize: string;
    stage: string;
    location: string;
  }>) => void;
}

export const ProjectCategories = ({ formData, onChange }: ProjectCategoriesProps) => {
  return (
    <FormSection title="Project Details">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => onChange({ category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="software">Software</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="ai">AI & ML</SelectItem>
              <SelectItem value="ecommerce">E-Commerce</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Team Size</Label>
          <Input
            type="number"
            value={formData.teamSize}
            onChange={(e) => onChange({ teamSize: e.target.value })}
            placeholder="Number of team members"
            required
            min="1"
          />
        </div>

        <div>
          <Label>Project Stage</Label>
          <Select
            value={formData.stage}
            onValueChange={(value) => onChange({ stage: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="idea">Idea Phase</SelectItem>
              <SelectItem value="mvp">MVP</SelectItem>
              <SelectItem value="growth">Growth</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Location</Label>
          <Select
            value={formData.location}
            onValueChange={(value) => onChange({ location: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="onsite">On-site</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </FormSection>
  );
};