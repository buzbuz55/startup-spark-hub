import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { optimizeImage } from "@/utils/imageOptimizer";

interface ProjectImageProps {
  image: string;
  name: string;
  onClick: () => void;
}

const ProjectImage = ({ image, name, onClick }: ProjectImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const optimizedImageUrl = optimizeImage(image || '');

  return (
    <div 
      className="relative h-48 overflow-hidden rounded-t-lg bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      {!imageLoaded && (
        <Skeleton className="w-full h-full absolute top-0 left-0" />
      )}
      <img 
        src={optimizedImageUrl}
        alt={name}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setImageLoaded(true)}
        loading="lazy"
      />
    </div>
  );
};

export default ProjectImage;