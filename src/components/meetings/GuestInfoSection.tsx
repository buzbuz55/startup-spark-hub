import { Input } from "@/components/ui/input";
import { useMeetingForm } from "./MeetingFormContext";

export function GuestInfoSection() {
  const { formData, setFormData } = useMeetingForm();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Guest Email</label>
      <Input
        type="email"
        placeholder="Enter guest email"
        value={formData.guestEmail}
        onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
        className="w-full"
      />

      <label className="text-sm font-medium">Subject</label>
      <Input
        type="text"
        placeholder="Enter meeting subject"
        value={formData.subject}
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        className="w-full"
      />
    </div>
  );
}