import { Button } from "@/components/ui/button";
import {
  Camera,
  FileText,
  BarChart2,
  Calendar,
  MapPin,
  User,
  Image,
  PenSquare,
  File,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

interface MessageActionProps {
  onActionSelect: (action: string) => void;
}

const MessageActions = ({ onActionSelect }: MessageActionProps) => {
  const actions = [
    { icon: <Camera className="h-5 w-5" />, label: "Camera", action: "camera" },
    { icon: <File className="h-5 w-5" />, label: "Files", action: "files" },
    { icon: <BarChart2 className="h-5 w-5" />, label: "Polls", action: "polls" },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Contracts",
      action: "contracts",
    },
    { icon: <Calendar className="h-5 w-5" />, label: "Event", action: "event" },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      action: "location",
    },
    {
      icon: <User className="h-5 w-5" />,
      label: "Contact",
      action: "contact",
    },
    {
      icon: <Image className="h-5 w-5" />,
      label: "AI Image",
      action: "ai-image",
    },
    {
      icon: <PenSquare className="h-5 w-5" />,
      label: "Edit",
      action: "edit",
    },
  ];

  const handleAction = (action: string) => {
    onActionSelect(action);
    toast.info(`${action} feature coming soon!`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10">
          <FileText className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" align="start" side="top">
        <div className="grid grid-cols-3 gap-2">
          {actions.map((action) => (
            <Button
              key={action.action}
              variant="ghost"
              className="flex flex-col items-center gap-1 h-auto py-2"
              onClick={() => handleAction(action.action)}
            >
              {action.icon}
              <span className="text-xs">{action.label}</span>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MessageActions;