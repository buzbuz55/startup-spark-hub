import { Globe, University } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const topTechSchools = {
  USA: [
    { name: "Massachusetts Institute of Technology (MIT)", portal: "https://mit.edu/admissions" },
    { name: "Stanford University", portal: "https://stanford.edu/admission" },
    { name: "California Institute of Technology", portal: "https://caltech.edu/admissions" },
    { name: "Carnegie Mellon University", portal: "https://cmu.edu/admission" },
    { name: "Georgia Institute of Technology", portal: "https://gatech.edu/admissions" },
    { name: "University of California, Berkeley", portal: "https://berkeley.edu/admissions" }
  ],
  UK: [
    { name: "University of Oxford", portal: "https://ox.ac.uk/admissions" },
    { name: "University of Cambridge", portal: "https://cam.ac.uk/admissions" },
    { name: "Imperial College London", portal: "https://imperial.ac.uk/study" },
    { name: "University College London", portal: "https://ucl.ac.uk/prospective-students" },
    { name: "University of Edinburgh", portal: "https://ed.ac.uk/studying" }
  ],
  Israel: [
    { name: "Technion – Israel Institute of Technology", portal: "https://technion.ac.il/admissions" },
    { name: "Tel Aviv University", portal: "https://tau.ac.il/admissions" },
    { name: "Hebrew University of Jerusalem", portal: "https://huji.ac.il/admissions" },
    { name: "Weizmann Institute of Science", portal: "https://weizmann.ac.il/admissions" }
  ],
  UAE: [
    { name: "Khalifa University", portal: "https://ku.ac.ae/admissions" },
    { name: "United Arab Emirates University", portal: "https://uaeu.ac.ae/en/admission" },
    { name: "American University of Sharjah", portal: "https://aus.edu/admissions" },
    { name: "Rochester Institute of Technology - Dubai", portal: "https://rit.edu/dubai/admissions" }
  ]
};

const TopTechSchools = () => {
  const handleSchoolClick = (school: { name: string, portal: string }) => {
    // In a real app, this would integrate with your database
    toast.info(`Connecting to ${school.name}'s portal... 🎓`, {
      description: "This feature will be integrated with the school's registration system.",
      action: {
        label: "Visit Website",
        onClick: () => window.open(school.portal, '_blank')
      }
    });
  };

  return (
    <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <University className="w-6 h-6" />
          Top Tech Schools
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(topTechSchools).map(([region, schools]) => (
          <div key={region} className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Globe className="w-4 h-4" />
              {region}
            </h3>
            <div className="space-y-1">
              {schools.map((school, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full text-left justify-start gap-2 text-sm p-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
                  onClick={() => handleSchoolClick(school)}
                >
                  <University className="w-4 h-4 text-purple-300" />
                  {school.name}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TopTechSchools;