export interface ProjectData {
  id: string; // Change to string to match UUID format
  name: string;
  category: string;
  description: string;
  seeking: string[];
  funding: string;
  impact: string;
  image: string;
  iconName: string;
}