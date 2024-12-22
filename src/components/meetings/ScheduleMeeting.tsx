import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ScheduleMeeting = () => {
  const [selectedContact, setSelectedContact] = useState<string>("");

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

      if (!selectedContact) {
        toast.error("Please select a contact");
        return;
      }

      // Generate a unique meeting room ID
      const roomId = `meeting-${Math.random().toString(36).substring(7)}`;
      const scheduledDate = new Date();
      
      // Store the meeting in Supabase
      const { error: meetingError } = await supabase
        .from('meetings')
        .insert({
          scheduled_date: scheduledDate.toISOString(),
          room_id: roomId,
          creator_id: user.id,
          status: 'scheduled'
        });

      if (meetingError) throw meetingError;

      // Send a message to the contact
      const { error: messageError } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          receiver_id: selectedContact,
          content: `Hi! I'd like to schedule a meeting with you. Here's the meeting link: ${roomId}. Looking forward to our discussion!`
        });

      if (messageError) throw messageError;

      toast.success("Meeting invitation sent!");
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      toast.error("Failed to schedule meeting");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Calendar className="w-4 h-4" />
          Schedule Meeting
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule a Meeting</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label htmlFor="contact" className="text-sm font-medium">
              Who would you like to meet with?
            </label>
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
          <Button onClick={handleScheduleMeeting} className="w-full">
            Send Meeting Invitation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleMeeting;