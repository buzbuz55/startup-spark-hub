import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMeetingForm } from "./MeetingFormContext";
import { TimeSlot } from "./types";

interface TimeSlotSelectorProps {
  timeSlots: TimeSlot[];
}

export function TimeSlotSelector({ timeSlots }: TimeSlotSelectorProps) {
  const { formData, setFormData } = useMeetingForm();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Select Time (EST)</label>
      <Select value={formData.selectedTime} onValueChange={(time) => setFormData({ ...formData, selectedTime: time })}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select time" />
        </SelectTrigger>
        <SelectContent className="h-[200px]">
          <ScrollArea className="h-full">
            {timeSlots.map((slot) => (
              <SelectItem
                key={slot.time}
                value={slot.time}
                disabled={slot.disabled}
                className="py-2 cursor-pointer hover:bg-accent transition-colors"
              >
                {slot.time}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
    </div>
  );
}