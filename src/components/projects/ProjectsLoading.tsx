import { Skeleton } from "@/components/ui/skeleton";

const ProjectsLoading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="h-[400px] rounded-xl" />
      ))}
    </div>
  );
};

export default ProjectsLoading;