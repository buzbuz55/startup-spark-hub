import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";
import { useMeetingForm } from "./MeetingFormContext";
import { useRef } from "react";

export function GuestInfoSection() {
  const { formData, setFormData } = useMeetingForm();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, attachedFile: file });
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="guestEmail">Guest Email</Label>
        <Input
          id="guestEmail"
          type="email"
          placeholder="Enter guest email"
          value={formData.guestEmail}
          onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          type="text"
          placeholder="Presentation about future project"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <div className="relative">
          <Textarea
            id="message"
            placeholder="Add a message (optional)"
            value={formData.message || ""}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full min-h-[100px] pr-12"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute bottom-2 right-2"
            onClick={handleFileButtonClick}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        {formData.attachedFile && (
          <p className="text-sm text-muted-foreground">
            File attached: {formData.attachedFile.name}
          </p>
        )}
      </div>
    </div>
  );
}