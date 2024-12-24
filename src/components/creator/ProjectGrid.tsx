import ProjectCard from "./ProjectCard";

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  teamSize: number;
  stage: string;
  type: string;
  creator: string;
  date: string;
  isHiring: boolean;
}

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid = ({ projects }: ProjectGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectGrid;