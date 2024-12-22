import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Building, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProjectDetailsDialog from "./ProjectDetailsDialog";
import OpenPositions from "./OpenPositions";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  teamSize: number;
  stage: string;
  location?: string;
  collaborationType?: string;
  isHiring?: boolean;
}

const ProjectCard = ({
  id,
  title,
  description,
  category,
  teamSize,
  stage,
  location,
  collaborationType,
  isHiring,
}: ProjectCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const handleChatClick = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to join the chat");
        return;
      }

      // First check if a group chat already exists for this company
      const { data: existingChat } = await supabase
        .from('company_group_chats')
        .select('chat_group_id')
        .eq('company_id', id)
        .single();

      let chatGroupId;

      if (existingChat) {
        chatGroupId = existingChat.chat_group_id;
      } else {
        // Create a new chat group
        const { data: newGroup, error: groupError } = await supabase
          .from('chat_groups')
          .insert({
            name: `${title} Team Chat`,
            description: `Group chat for ${title} team members and founders`,
            created_by: user.id,
          })
          .select()
          .single();

        if (groupError) throw groupError;

        // Link the chat group to the company
        const { error: linkError } = await supabase
          .from('company_group_chats')
          .insert({
            company_id: id,
            chat_group_id: newGroup.id,
          });

        if (linkError) throw linkError;

        // Add the current user as a member and admin
        const { error: memberError } = await supabase
          .from('group_members')
          .insert({
            group_id: newGroup.id,
            user_id: user.id,
            is_admin: true,
          });

        if (memberError) throw memberError;

        chatGroupId = newGroup.id;
      }

      // Navigate to messages with the group chat selected
      navigate(`/messages?group=${chatGroupId}`);
    } catch (error) {
      console.error('Error handling chat:', error);
      toast.error("Failed to open chat");
    }
  };

  return (
    <Card className="relative overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="flex items-center gap-1">
            <Building className="w-3 h-3" />
            {category}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {teamSize} members
          </Badge>
          <Badge variant="outline">{stage}</Badge>
          {location && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {location}
            </Badge>
          )}
          {collaborationType && (
            <Badge variant="outline">{collaborationType}</Badge>
          )}
          {isHiring && (
            <Badge variant="default" className="bg-green-500">
              Hiring
            </Badge>
          )}
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => setShowDetails(true)}>
            View Details
          </Button>
        </div>
      </div>

      {/* Floating chat button */}
      <Button
        className="absolute bottom-4 left-4 rounded-full shadow-lg"
        size="icon"
        onClick={handleChatClick}
      >
        <MessageSquare className="w-4 h-4" />
      </Button>

      <ProjectDetailsDialog
        open={showDetails}
        onOpenChange={setShowDetails}
        project={{
          id,
          title,
          description,
          category,
          teamSize,
          stage,
          location,
          collaborationType,
          isHiring,
        }}
      />
    </Card>
  );
};

export default ProjectCard;