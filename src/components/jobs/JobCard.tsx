
import { MapPin, Building2, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Job } from "./types";

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center">
              <Building2 className="h-4 w-4 mr-1" />
              {job.company}
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {job.location}
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              {job.salary}
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Badge variant="secondary">{job.type}</Badge>
          <Badge>{job.level}</Badge>
        </div>
      </div>
      <p className="text-muted-foreground mb-4">{job.description}</p>
      <Button>Apply Now</Button>
    </Card>
  );
};

export default JobCard;
