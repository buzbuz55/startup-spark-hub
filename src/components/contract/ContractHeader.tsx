import { Button } from "@/components/ui/button";
import { Printer, Share2, ZoomIn, ZoomOut } from "lucide-react";

interface ContractHeaderProps {
  handlePrint: () => void;
  handleShare: () => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}

export const ContractHeader = ({
  handlePrint,
  handleShare,
  handleZoomIn,
  handleZoomOut,
}: ContractHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Non-Disclosure Agreement</h1>
      <div className="flex gap-2">
        <Button variant="outline" size="icon" onClick={handlePrint}>
          <Printer className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleZoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleZoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};