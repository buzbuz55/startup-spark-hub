import { Heart, Book, Camera, Gamepad, Music, Smile, Github } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { InternProfile as InternProfileType } from "@/types/intern";

interface Hobby {
  icon: React.ReactNode;
  name: string;
}

const hobbies: Hobby[] = [
  { icon: <Heart className="w-4 h-4" />, name: "Fitness" },
  { icon: <Book className="w-4 h-4" />, name: "Reading" },
  { icon: <Camera className="w-4 h-4" />, name: "Photography" },
  { icon: <Gamepad className="w-4 h-4" />, name: "Gaming" },
  { icon: <Music className="w-4 h-4" />, name: "Music" },
  { icon: <Smile className="w-4 h-4" />, name: "Art" },
];

export const InternProfile = ({ 
  name, 
  role, 
  about, 
  skills, 
  funFacts, 
  avatar,
  githubUrl 
}: InternProfileType) => {
  return (
    <Card className="w-full bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={avatar || "/placeholder.svg"} alt={`${name}'s profile`} />
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
          <p className="text-gray-600">{role}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-base font-medium text-gray-900 mb-2">About Me</h4>
          <p className="text-gray-600">{about}</p>
        </div>
        
        <div>
          <h4 className="text-base font-medium text-gray-900 mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">{skill}</Badge>
            ))}
          </div>
        </div>

        {githubUrl && (
          <div>
            <h4 className="text-base font-medium text-gray-900 mb-2">GitHub Profile</h4>
            <a 
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <Github className="w-5 h-5" />
              View GitHub Profile
            </a>
          </div>
        )}

        <div>
          <h4 className="text-base font-medium text-gray-900 mb-2">Hobbies & Interests</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {hobbies.map((hobby, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                {hobby.icon}
                <span className="text-sm text-gray-600">{hobby.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-base font-medium text-gray-900 mb-2">Fun Facts</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {funFacts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default InternProfile;