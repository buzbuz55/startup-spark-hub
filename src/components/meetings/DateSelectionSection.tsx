import { Calendar } from "@/components/ui/calendar";
import { isBefore, startOfToday } from "date-fns";
import { useMeetingForm } from "./MeetingFormContext";

export function DateSelectionSection() {
  const { formData, setFormData } = useMeetingForm();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Select Date</label>
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={formData.selectedDate}
          onSelect={(date) => setFormData({ ...formData, selectedDate: date })}
          disabled={(date) => isBefore(date, startOfToday())}
          initialFocus
          className="rounded-md border"
        />
      </div>
    </div>
  );
}