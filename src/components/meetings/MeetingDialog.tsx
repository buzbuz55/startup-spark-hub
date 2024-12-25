import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { format, isBefore, startOfToday } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import TimeSlotSelector from "./TimeSlotSelector";
import type { MeetingFormData, TimeSlot } from "./types";

const MeetingDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<MeetingFormData>({
    guestEmail: "",
    subject: "",
    selectedDate: undefined,
    selectedTime: "10:00",
  });

  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute of [0, 30]) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
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
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to schedule meetings");
        return;
      }

      if (!formData.selectedDate || !formData.subject || !formData.guestEmail) {
        toast.error("Please fill in all required fields");
        return;
      }

      // Combine date and time
      const meetingDateTime = new Date(formData.selectedDate);
      const [hours, minutes] = formData.selectedTime.split(':');
      meetingDateTime.setHours(parseInt(hours), parseInt(minutes));

      // Validate meeting time is in the future
      if (isBefore(meetingDateTime, new Date())) {
        toast.error("Please select a future date and time");
        return;
      }

      // Generate unique room ID and meeting link
      const roomId = `meeting-${Math.random().toString(36).substring(7)}`;
      const meetingLink = `https://startupspark.app/meeting/${roomId}`;

      // Store the meeting in Supabase
      const { error: meetingError } = await supabase
        .from('meetings')
        .insert({
          scheduled_date: meetingDateTime.toISOString(),
          room_id: roomId,
          creator_id: user.id,
          status: 'scheduled',
          guest_email: formData.guestEmail,
          meeting_link: meetingLink
        });

      if (meetingError) throw meetingError;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke('send-meeting-email', {
        body: {
          to: formData.guestEmail,
          subject: formData.subject,
          meetingDate: format(meetingDateTime, 'PPpp'),
          meetingLink,
          creatorEmail: user.email
        }
      });

      if (emailError) throw emailError;

      toast.success("Meeting scheduled and invitation sent!");
      setIsOpen(false);
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      toast.error("Failed to schedule meeting");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative group">
          <Calendar className="w-4 h-4" />
          <span className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
            Schedule Meeting
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule a Meeting</DialogTitle>
          <DialogDescription>
            Fill in the details below to schedule a meeting and send an invitation.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Guest Email</label>
            <Input
              type="email"
              placeholder="Enter guest email"
              value={formData.guestEmail}
              onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Subject</label>
            <Input
              type="text"
              placeholder="Enter meeting subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select Date</label>
            <Calendar
              mode="single"
              selected={formData.selectedDate}
              onSelect={(date) => setFormData({ ...formData, selectedDate: date })}
              disabled={(date) => isBefore(date, startOfToday())}
              initialFocus
              className="rounded-md border"
            />
          </div>

          <TimeSlotSelector
            timeSlots={generateTimeSlots()}
            selectedTime={formData.selectedTime}
            onTimeSelect={(time) => setFormData({ ...formData, selectedTime: time })}
          />

          <Button onClick={handleScheduleMeeting} className="w-full">
            Schedule Meeting
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingDialog;