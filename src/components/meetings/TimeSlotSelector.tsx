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
        <SelectContent>
          <ScrollArea className="h-[200px] w-full pr-4">
            <div className="p-1">
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
            </div>
          </ScrollArea>
        </SelectContent>
      </Select>
    </div>
  );
}