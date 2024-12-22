import { Badge } from "@/components/ui/badge";

interface ProjectRolesProps {
  seeking: string[];
}

const ProjectRoles = ({ seeking }: ProjectRolesProps) => {
  return (
    <div>
      <h4 className="font-semibold mb-2">Looking for:</h4>
      <div className="flex flex-wrap gap-2">
        {seeking.map((role, idx) => (
          <Badge key={idx} variant="outline">{role}</Badge>
        ))}
      </div>
    </div>
  );
};

export default ProjectRoles;