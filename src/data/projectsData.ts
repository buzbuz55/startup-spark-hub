
import { ProjectData } from "@/types/project";
import { energyProjects } from "./projects/energyProjects";
import { environmentalProjects } from "./projects/environmentalProjects";
import { urbanProjects } from "./projects/urbanProjects";
import { techProjects } from "./projects/techProjects";

export type { ProjectData };

export const projectsData: ProjectData[] = [
  ...energyProjects,
  ...environmentalProjects,
  ...urbanProjects,
  ...techProjects,
];
