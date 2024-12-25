import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useMeetingForm } from "./MeetingFormContext";

export function GuestInfoSection() {
  const { formData, setFormData } = useMeetingForm();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, attachedFile: file });
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
        <Textarea
          id="message"
          placeholder="Add a message (optional)"
          value={formData.message || ""}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">Attach File (optional)</Label>
        <Input
          id="file"
          type="file"
          onChange={handleFileChange}
          className="w-full"
        />
      </div>
    </div>
  );
}