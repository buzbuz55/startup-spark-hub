import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Mail, X, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface OpenPositionsProps {
  projectId: string;
}

interface FundingDetails {
  amount: string;
  investor: string;
  linkedinUrl: string;
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
  const [fundingDetails] = useState<FundingDetails>({
    amount: "$2.5M",
    investor: "TechVentures Capital",
    linkedinUrl: "https://linkedin.com/company/techventures"
  });

  const handleAddPosition = () => {
    if (newPosition.trim()) {
      setPositions([...positions, newPosition.toUpperCase()]);
      setNewPosition("");
      toast.success("Position added successfully");
    }
  };

  const handleRemovePosition = (indexToRemove: number) => {
    setPositions(positions.filter((_, index) => index !== indexToRemove));
    toast.success("Position removed successfully");
  };

  const handleInviteByEmail = async () => {
    if (!emailInvite.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    try {
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
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Funding Details:</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">{fundingDetails.amount}</p>
              <p className="text-gray-600">Funded by: {fundingDetails.investor}</p>
            </div>
            <a 
              href={fundingDetails.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
            >
              <ExternalLink className="w-4 h-4" />
              Investor Profile
            </a>
          </div>
        </div>
      </div>

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
              className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 cursor-pointer flex items-center gap-2"
            >
              {position}
              <X 
                className="w-3 h-3 hover:text-red-300 transition-colors" 
                onClick={() => handleRemovePosition(idx)}
              />
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
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