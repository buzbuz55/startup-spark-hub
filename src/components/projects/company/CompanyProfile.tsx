import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Building, Globe, Users, DollarSign } from "lucide-react";

interface CompanyProfileProps {
  company: {
    name: string;
    logo?: string;
    website?: string;
    teamSize?: string;
    funding?: string;
    location?: string;
  };
}

const CompanyProfile = ({ company }: CompanyProfileProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <img src={company.logo || "/placeholder.svg"} alt={company.name} />
        </Avatar>
        <div>
          <h3 className="text-xl font-semibold">{company.name}</h3>
          {company.location && (
            <div className="flex items-center text-muted-foreground">
              <Building className="w-4 h-4 mr-1" />
              {company.location}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {company.website && (
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <a href={company.website} target="_blank" rel="noopener noreferrer" 
               className="text-sm hover:underline">
              Website
            </a>
          </div>
        )}
        {company.teamSize && (
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">{company.teamSize} employees</span>
          </div>
        )}
        {company.funding && (
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">{company.funding} raised</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;