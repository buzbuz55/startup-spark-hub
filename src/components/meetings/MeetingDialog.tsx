import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { isBefore, startOfToday } from "date-fns";
import { MeetingFormProvider } from "./MeetingFormContext";
import { GuestInfoSection } from "./GuestInfoSection";
import { DateSelectionSection } from "./DateSelectionSection";
import { TimeSlotSelector } from "./TimeSlotSelector";
import { scheduleMeeting } from "./SchedulingLogic";
import { useMeetingForm } from "./MeetingFormContext";
import type { TimeSlot } from "./types";

interface MeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function MeetingDialogContent({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
  const { formData } = useMeetingForm();

  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of [0, 30]) {
        const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const period = hour >= 12 ? 'PM' : 'AM';
        const timeString = `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period} EST`;
        const today = startOfToday();
        const slotDate = formData.selectedDate ? 
          new Date(formData.selectedDate.setHours(hour, minute)) : 
          new Date(today.setHours(hour, minute));

        slots.push({
          time: timeString,
          disabled: isBefore(slotDate, new Date())
        });
      }
    }
    return slots;
  };

  const handleScheduleMeeting = async () => {
    const success = await scheduleMeeting(formData);
    if (success) {
      onOpenChange(false);
    }
  };

  return (
    <div className="grid gap-6 py-4">
      <GuestInfoSection />
      <DateSelectionSection />
      <TimeSlotSelector timeSlots={generateTimeSlots()} />
      <Button onClick={handleScheduleMeeting} className="w-full bg-primary hover:bg-primary/90">
        Schedule Meeting
      </Button>
    </div>
  );
}

export default function MeetingDialog({ open, onOpenChange }: MeetingDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">Schedule a Meeting</DialogTitle>
        </DialogHeader>
        <MeetingFormProvider>
          <MeetingDialogContent onOpenChange={onOpenChange} />
        </MeetingFormProvider>
      </DialogContent>
    </Dialog>
  );
}