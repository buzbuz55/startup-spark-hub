import { Skeleton } from "@/components/ui/skeleton";
import ProjectCard from "@/components/projects/ProjectCard";
import type { Project } from "@/components/projects/ProjectCard";

interface SearchResultsProps {
  projects: Project[] | undefined;
  isLoading: boolean;
}

const SearchResults = ({ projects, isLoading }: SearchResultsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[400px] rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default SearchResults;