import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle } from "@/components/ui/card";
import * as Icons from "lucide-react";

interface ProjectHeaderProps {
  name: string;
  category: string;
  iconName: string;
}

const ProjectHeader = ({ name, category, iconName }: ProjectHeaderProps) => {
  const DynamicIcon = (Icons as any)[iconName] || Icons.FileQuestion;

  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <DynamicIcon className="w-6 h-6" />
          {name}
        </span>
        <Badge variant="secondary">{category}</Badge>
      </CardTitle>
    </CardHeader>
  );
};

export default ProjectHeader;