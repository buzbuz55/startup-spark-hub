import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Video } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

const ScheduleMeeting = () => {
  const [selectedContact, setSelectedContact] = useState<string>("");
  const [guestEmail, setGuestEmail] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("10:00");
  const [isNewGuest, setIsNewGuest] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    {
      id: "d7bed21c-5a38-4c44-87f5-7b8f3f3c2421",
      name: "Sarah Chen",
      role: "Software Engineer"
    },
    {
      id: "e9be0901-6a77-4b55-9644-3a25b56a90c9",
      name: "Alex Kumar",
      role: "Product Designer"
    },
    {
      id: "f1c3a45b-2d89-4e67-8a31-9c45b7c8d3ef",
      name: "Maria Garcia",
      role: "VC Associate"
    }
  ];

  const handleScheduleMeeting = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to schedule meetings");
        return;
      }

      if (!selectedDate) {
        toast.error("Please select a date");
        return;
      }

      if (!isNewGuest && !selectedContact) {
        toast.error("Please select a contact");
        return;
      }

      if (isNewGuest && !guestEmail) {
        toast.error("Please enter guest email");
        return;
      }

      // Combine date and time
      const meetingDateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':');
      meetingDateTime.setHours(parseInt(hours), parseInt(minutes));

      // Generate unique room ID
      const roomId = `meeting-${Math.random().toString(36).substring(7)}`;

      // Store the meeting in Supabase
      const { error: meetingError } = await supabase
        .from('meetings')
        .insert({
          scheduled_date: meetingDateTime.toISOString(),
          room_id: roomId,
          creator_id: user.id,
          status: 'scheduled',
          guest_email: isNewGuest ? guestEmail : null
        });

      if (meetingError) throw meetingError;

      // If selecting existing contact, send them a message
      if (!isNewGuest) {
        const { error: messageError } = await supabase
          .from('messages')
          .insert({
            sender_id: user.id,
            receiver_id: selectedContact,
            content: `Hi! I've scheduled a video meeting with you on ${format(meetingDateTime, 'PPpp')}. The meeting will be available in the messages tab when it's time. Looking forward to our discussion!`
          });

        if (messageError) throw messageError;
      }

      toast.success("Meeting scheduled successfully!");
      setIsOpen(false);
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      toast.error("Failed to schedule meeting");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Video className="w-4 h-4" />
          Schedule Meeting
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule a Video Meeting</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Date</label>
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select Time</label>
            <Input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Guest Type</label>
            <Select
              value={isNewGuest ? "new" : "existing"}
              onValueChange={(value) => setIsNewGuest(value === "new")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select guest type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="existing">Existing Contact</SelectItem>
                <SelectItem value="new">New Guest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isNewGuest ? (
            <div className="space-y-2">
              <label className="text-sm font-medium">Guest Email</label>
              <Input
                type="email"
                placeholder="Enter guest email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Contact</label>
              <Select
                value={selectedContact}
                onValueChange={setSelectedContact}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a contact" />
                </SelectTrigger>
                <SelectContent>
                  {contacts.map((contact) => (
                    <SelectItem key={contact.id} value={contact.id}>
                      {contact.name} - {contact.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Button onClick={handleScheduleMeeting} className="w-full">
            Schedule Meeting
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleMeeting;