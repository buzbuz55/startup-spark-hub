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
      <Select 
        value={formData.selectedTime} 
        onValueChange={(time) => setFormData({ ...formData, selectedTime: time })}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select time" />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="h-[280px] rounded-md">
            <div className="p-2">
              {timeSlots.map((slot) => (
                <SelectItem
                  key={slot.time}
                  value={slot.time}
                  disabled={slot.disabled}
                  className="relative px-4 py-3 cursor-pointer hover:bg-accent rounded-sm transition-colors focus:bg-accent"
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