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
      <label className="text-sm font-medium">Select Time</label>
      <Select value={selectedTime} onValueChange={onTimeSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select time" />
        </SelectTrigger>
        <SelectContent>
          {timeSlots.map((slot) => (
            <SelectItem
              key={slot.time}
              value={slot.time}
              disabled={slot.disabled}
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