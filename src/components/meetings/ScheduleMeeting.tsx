import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Video, Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ScheduleMeeting = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showVideoCall, setShowVideoCall] = useState(false);

  const handleScheduleMeeting = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to schedule meetings");
        return;
      }

      if (!date) {
        toast.error("Please select a date");
        return;
      }

      // Generate a unique meeting room ID
      const roomId = `meeting-${Math.random().toString(36).substring(7)}`;
      
      // Store the meeting in Supabase
      const { error } = await supabase
        .from('meetings')
        .insert({
          scheduled_date: date.toISOString(),
          room_id: roomId,
          creator_id: user.id,
          status: 'scheduled'
        });

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      toast.success("Meeting scheduled successfully!");
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      toast.error("Failed to schedule meeting");
    }
  };

  const startVideoCall = () => {
    setShowVideoCall(true);
    // In a real implementation, you would initialize your video call SDK here
    toast.success("Video call started! (Demo)");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <CalendarIcon className="w-4 h-4" />
          Schedule Meeting
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule a Meeting</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
          <div className="flex gap-4 justify-end">
            <Button onClick={handleScheduleMeeting} className="gap-2">
              <CalendarIcon className="w-4 h-4" />
              Schedule
            </Button>
            <Button onClick={startVideoCall} variant="secondary" className="gap-2">
              <Video className="w-4 h-4" />
              Start Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleMeeting;