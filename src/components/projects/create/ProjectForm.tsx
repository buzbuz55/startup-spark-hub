import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  stage: string;
  website_url: string;
  team_size: number;
}

interface ProjectFormProps {
  formData: ProjectFormData;
  characterCount: number;
  onFormChange: (data: Partial<ProjectFormData>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const ProjectForm = ({ formData, characterCount, onFormChange, onDescriptionChange }: ProjectFormProps) => {
  return (
    <div className="space-y-4">
      <Input
        value={formData.title}
        onChange={(e) => onFormChange({ title: e.target.value })}
        placeholder="Project Name"
        className="bg-[#2a2a2a] border-gray-700 text-white"
        maxLength={40}
      />
      <div className="text-right text-sm text-gray-400">
        {formData.title.length}/40
      </div>

      <Textarea
        value={formData.description}
        onChange={onDescriptionChange}
        placeholder="Tell us about your company and what you're building..."
        className="min-h-[100px] bg-[#2a2a2a] border-gray-700 text-white"
        maxLength={200}
      />
      <div className="text-right text-sm text-gray-400">
        {characterCount}/200
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Stage:</label>
          <Select
            value={formData.stage}
            onValueChange={(value) => onFormChange({ stage: value })}
          >
            <SelectTrigger className="bg-[#2a2a2a] border-gray-700 text-white">
              <SelectValue placeholder="Growth Stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="idea">Idea Phase</SelectItem>
              <SelectItem value="mvp">MVP</SelectItem>
              <SelectItem value="beta">Beta</SelectItem>
              <SelectItem value="growth">Growth</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Category:</label>
          <Select
            value={formData.category}
            onValueChange={(value) => onFormChange({ category: value })}
          >
            <SelectTrigger className="bg-[#2a2a2a] border-gray-700 text-white">
              <SelectValue placeholder="Software" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="software">Software</SelectItem>
              <SelectItem value="hardware">Hardware</SelectItem>
              <SelectItem value="ai">AI & ML</SelectItem>
              <SelectItem value="marketplace">Marketplace</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-400">Website URL (optional)</label>
        <Input
          value={formData.website_url}
          onChange={(e) => onFormChange({ website_url: e.target.value })}
          placeholder="https://example.com"
          className="bg-[#2a2a2a] border-gray-700 text-white"
          type="url"
        />
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full border-purple-500 text-purple-500 hover:bg-purple-500/10"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add open positions on your team
      </Button>
    </div>
  );
};