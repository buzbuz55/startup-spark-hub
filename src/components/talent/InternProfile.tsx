import { Heart, Book, Camera, Gamepad, Music, Smile } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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

const InternProfile = () => {
  return (
    <Card className="w-full bg-white shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src="/placeholder.svg" alt="Intern profile" />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold">Sarah Chen 🌟</h3>
          <p className="text-gray-600">Software Engineering Intern ✨</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold mb-2">About Me 🎯</h4>
          <p className="text-gray-600">
            Passionate about creating innovative solutions and learning new technologies! 
            Currently exploring web development and AI. 🚀
          </p>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-2">Skills 💪</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">React.js</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Node.js</Badge>
            <Badge variant="secondary">Python</Badge>
            <Badge variant="secondary">UI/UX Design</Badge>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Hobbies & Interests 🎨</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {hobbies.map((hobby, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                {hobby.icon}
                <span className="text-sm">{hobby.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Fun Facts 🌈</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>Can solve a Rubik's cube in under 2 minutes! 🎲</li>
            <li>Amateur coffee connoisseur ☕</li>
            <li>Speaks three languages 🗣️</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default InternProfile;