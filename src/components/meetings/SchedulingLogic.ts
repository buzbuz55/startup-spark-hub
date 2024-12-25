import { MeetingFormData } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export async function scheduleMeeting(formData: MeetingFormData): Promise<boolean> {
  try {
    if (!formData.selectedDate || !formData.guestEmail || !formData.subject) {
      toast.error("Please fill in all required fields");
      return false;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Please sign in to schedule meetings");
      return false;
    }

    let fileUrl = null;
    if (formData.attachedFile) {
      const fileExt = formData.attachedFile.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('meeting_attachments')
        .upload(filePath, formData.attachedFile);

      if (uploadError) {
        console.error("Error uploading file:", uploadError);
        toast.error("Failed to upload attachment");
        return false;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('meeting_attachments')
        .getPublicUrl(filePath);
      
      fileUrl = publicUrl;
    }

    const meetingDateTime = new Date(formData.selectedDate);
    const [hours, minutes] = formData.selectedTime.split(' ')[0].split(':');
    const period = formData.selectedTime.split(' ')[1];
    let hour = parseInt(hours);
    
    if (period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (period === 'AM' && hour === 12) {
      hour = 0;
    }
    
    meetingDateTime.setHours(hour, parseInt(minutes));

    const roomId = `meeting-${Math.random().toString(36).substring(7)}`;

    const { error: meetingError } = await supabase
      .from('meetings')
      .insert({
        scheduled_date: meetingDateTime.toISOString(),
        room_id: roomId,
        creator_id: user.id,
        status: 'scheduled',
        guest_email: formData.guestEmail,
        attachment_url: fileUrl,
        subject: formData.subject,
        message: formData.message
      });

    if (meetingError) {
      console.error("Error scheduling meeting:", meetingError);
      toast.error("Failed to schedule meeting");
      return false;
    }

    toast.success("Meeting scheduled successfully!");
    return true;
  } catch (error) {
    console.error("Error in scheduleMeeting:", error);
    toast.error("Failed to schedule meeting");
    return false;
  }
}