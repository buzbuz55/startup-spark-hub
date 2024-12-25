import { supabase } from "@/integrations/supabase/client";
import { format, isBefore } from "date-fns";
import { toast } from "sonner";
import { MeetingFormData } from "./types";

export async function scheduleMeeting(formData: MeetingFormData) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Please sign in to schedule meetings");
      return false;
    }

    if (!formData.selectedDate || !formData.subject || !formData.guestEmail) {
      toast.error("Please fill in all required fields");
      return false;
    }

    // Parse the time string to get hours and minutes
    const [time, period] = formData.selectedTime.split(' ');
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours);
    
    // Convert to 24-hour format
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;

    // Combine date and time
    const meetingDateTime = new Date(formData.selectedDate);
    meetingDateTime.setHours(hour, parseInt(minutes));

    // Validate meeting time is in the future
    if (isBefore(meetingDateTime, new Date())) {
      toast.error("Please select a future date and time");
      return false;
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
    return true;
  } catch (error) {
    console.error("Error scheduling meeting:", error);
    toast.error("Failed to schedule meeting");
    return false;
  }
}