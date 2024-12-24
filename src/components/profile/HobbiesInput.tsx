import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface HobbiesInputProps {
  hobbies: string[];
  onChange: (hobbies: string[]) => void;
}

const HobbiesInput = ({ hobbies, onChange }: HobbiesInputProps) => {
  const [newHobby, setNewHobby] = useState("");

  const addHobby = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newHobby.trim()) {
      e.preventDefault();
      if (!hobbies.includes(newHobby.trim())) {
        onChange([...hobbies, newHobby.trim()]);
      }
      setNewHobby("");
    }
  };

  const removeHobby = (hobby: string) => {
    onChange(hobbies.filter(h => h !== hobby));
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="hobbies">Hobbies</Label>
      <Input
        id="hobbies"
        value={newHobby}
        onChange={(e) => setNewHobby(e.target.value)}
        onKeyDown={addHobby}
        placeholder="Type a hobby and press Enter"
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {hobbies.map((hobby) => (
          <Badge key={hobby} variant="secondary" className="gap-1">
            {hobby}
            <button
              type="button"
              onClick={() => removeHobby(hobby)}
              className="ml-1 hover:text-destructive"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default HobbiesInput;