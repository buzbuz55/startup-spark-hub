import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Mail } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface OpenPositionsProps {
  projectId: string;
}

const OpenPositions = ({ projectId }: OpenPositionsProps) => {
  const [newPosition, setNewPosition] = useState("");
  const [emailInvite, setEmailInvite] = useState("");
  const [positions, setPositions] = useState([
    "SOFTWARE DEVELOPER",
    "MOBILE APP DEVELOPER (IOS)",
    "BACKEND DEVELOPER",
    "FULL-STACK DEVELOPER",
    "SECURITY ENGINEER"
  ]);

  const handleAddPosition = async () => {
    try {
      if (!newPosition.trim()) {
        toast.error("Please enter a position title");
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to add positions");
        return;
      }

      const { error } = await supabase
        .from('team_positions')
        .insert({
          company_id: projectId,
          title: newPosition.toUpperCase(),
          description: `New position for ${newPosition}`
        });

      if (error) throw error;

      setPositions([...positions, newPosition.toUpperCase()]);
      setNewPosition("");
      toast.success("Position added successfully");
    } catch (error) {
      console.error('Error adding position:', error);
      toast.error("Failed to add position");
    }
  };

  const handleInviteByEmail = async () => {
    try {
      if (!emailInvite.trim()) {
        toast.error("Please enter an email address");
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to send invites");
        return;
      }

      const { error } = await supabase
        .from('team_positions')
        .insert({
          company_id: projectId,
          title: "Team Member",
          description: `Invited by email: ${emailInvite}`
        });

      if (error) throw error;

      toast.success(`Invitation sent to ${emailInvite}`);
      setEmailInvite("");
    } catch (error) {
      console.error('Error sending invitation:', error);
      toast.error("Failed to send invitation");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Open positions:</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Add new position..."
            value={newPosition}
            onChange={(e) => setNewPosition(e.target.value)}
            className="w-48"
          />
          <Button
            size="sm"
            onClick={handleAddPosition}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {positions.map((position, idx) => (
          <Badge
            key={idx}
            variant="secondary"
            className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 cursor-pointer"
          >
            {position}
          </Badge>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Input
          placeholder="Invite by email..."
          value={emailInvite}
          onChange={(e) => setEmailInvite(e.target.value)}
          type="email"
        />
        <Button
          onClick={handleInviteByEmail}
          className="gap-2 whitespace-nowrap"
        >
          <Mail className="w-4 h-4" />
          Send Invite
        </Button>
      </div>
    </div>
  );
};

export default OpenPositions;