import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

interface Position {
  title: string;
  details: string;
  isPaid: boolean;
  isUnpaid: boolean;
  isEquitySplit: boolean;
}

interface PositionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdatePositions: (positions: Position[]) => void;
}

export const PositionsModal = ({ open, onOpenChange, onUpdatePositions }: PositionsModalProps) => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [currentPosition, setCurrentPosition] = useState<Position>({
    title: "",
    details: "",
    isPaid: false,
    isUnpaid: false,
    isEquitySplit: false,
  });

  const handleAddPosition = () => {
    if (currentPosition.title && currentPosition.details) {
      setPositions([...positions, currentPosition]);
      setCurrentPosition({
        title: "",
        details: "",
        isPaid: false,
        isUnpaid: false,
        isEquitySplit: false,
      });
    }
  };

  const handleUpdatePositions = () => {
    onUpdatePositions(positions);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-[#1a1a1a] text-white border-gray-800">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-white">Modify Positions</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Input
              value={currentPosition.title}
              onChange={(e) => setCurrentPosition({ ...currentPosition, title: e.target.value })}
              placeholder="Role title"
              className="bg-[#2a2a2a] border-gray-700 text-white"
              maxLength={25}
            />
            <div className="text-right text-sm text-gray-400">
              {currentPosition.title.length}/25
            </div>
          </div>

          <div>
            <Textarea
              value={currentPosition.details}
              onChange={(e) => setCurrentPosition({ ...currentPosition, details: e.target.value })}
              placeholder="Details"
              className="min-h-[100px] bg-[#2a2a2a] border-gray-700 text-white"
            />
          </div>

          <div className="flex space-x-6">
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={currentPosition.isPaid}
                onCheckedChange={(checked) => 
                  setCurrentPosition({ ...currentPosition, isPaid: checked as boolean })
                }
              />
              <span className="text-sm">PAID</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={currentPosition.isUnpaid}
                onCheckedChange={(checked) => 
                  setCurrentPosition({ ...currentPosition, isUnpaid: checked as boolean })
                }
              />
              <span className="text-sm">UNPAID</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={currentPosition.isEquitySplit}
                onCheckedChange={(checked) => 
                  setCurrentPosition({ ...currentPosition, isEquitySplit: checked as boolean })
                }
              />
              <span className="text-sm">EQUITY SPLIT</span>
            </label>
          </div>

          <Button
            onClick={handleAddPosition}
            className="w-full bg-purple-600 text-white hover:bg-purple-700"
          >
            ADD
          </Button>

          <div className="text-sm text-gray-400">
            Added {positions.length}/5
          </div>

          {positions.length > 0 && (
            <div className="space-y-2">
              {positions.map((position, index) => (
                <div key={index} className="p-3 bg-[#2a2a2a] rounded-lg">
                  <h4 className="font-medium">{position.title}</h4>
                  <p className="text-sm text-gray-400">{position.details}</p>
                  <div className="flex gap-2 mt-2">
                    {position.isPaid && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">PAID</span>}
                    {position.isUnpaid && <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">UNPAID</span>}
                    {position.isEquitySplit && <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">EQUITY</span>}
                  </div>
                </div>
              ))}
            </div>
          )}

          <Button
            onClick={handleUpdatePositions}
            className="w-full bg-white text-black hover:bg-gray-200"
          >
            UPDATE POSITIONS
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};