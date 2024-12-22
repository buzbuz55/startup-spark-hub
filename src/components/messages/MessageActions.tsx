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
import { useState } from "react";

interface MessageActionProps {
  onActionSelect: (action: string, data?: any) => void;
}

const MessageActions = ({ onActionSelect }: MessageActionProps) => {
  const [fileInput] = useState(() => {
    const input = document.createElement("input");
    input.type = "file";
    return input;
  });

  const handleFileSelect = () => {
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        onActionSelect("files", file);
      }
    };
    fileInput.click();
  };

  const handleCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      onActionSelect("camera", stream);
      toast.success("Camera accessed successfully!");
    } catch (error) {
      toast.error("Unable to access camera. Please check permissions.");
    }
  };

  const handleLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onActionSelect("location", { latitude, longitude });
          toast.success("Location shared successfully!");
        },
        () => {
          toast.error("Unable to get location. Please check permissions.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  const actions = [
    {
      icon: <Camera className="h-5 w-5" />,
      label: "Camera",
      action: "camera",
      handler: handleCameraAccess,
    },
    {
      icon: <File className="h-5 w-5" />,
      label: "Files",
      action: "files",
      handler: handleFileSelect,
    },
    {
      icon: <BarChart2 className="h-5 w-5" />,
      label: "Polls",
      action: "polls",
      handler: () => onActionSelect("polls"),
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Contracts",
      action: "contracts",
      handler: () => onActionSelect("contracts"),
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Event",
      action: "event",
      handler: () => onActionSelect("event"),
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      action: "location",
      handler: handleLocation,
    },
    {
      icon: <User className="h-5 w-5" />,
      label: "Contact",
      action: "contact",
      handler: () => onActionSelect("contact"),
    },
    {
      icon: <Image className="h-5 w-5" />,
      label: "AI Image",
      action: "ai-image",
      handler: () => onActionSelect("ai-image"),
    },
    {
      icon: <PenSquare className="h-5 w-5" />,
      label: "Edit",
      action: "edit",
      handler: () => onActionSelect("edit"),
    },
  ];

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
              onClick={action.handler}
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