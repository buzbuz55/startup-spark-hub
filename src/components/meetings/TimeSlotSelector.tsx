import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TimeSlot } from "./types";

interface TimeSlotSelectorProps {
  timeSlots: TimeSlot[];
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

const TimeSlotSelector = ({ timeSlots, selectedTime, onTimeSelect }: TimeSlotSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Select Time (EST)</label>
      <Select value={selectedTime} onValueChange={onTimeSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select time" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {timeSlots.map((slot) => (
            <SelectItem
              key={slot.time}
              value={slot.time}
              disabled={slot.disabled}
              className="py-2"
            >
              {slot.time}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimeSlotSelector;