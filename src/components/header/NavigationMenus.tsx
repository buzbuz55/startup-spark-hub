import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Briefcase, GraduationCap, Network, Rocket, Users, BookOpen, HelpCircle, FileText } from "lucide-react";

const NavigationMenus = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Opportunities</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-2 p-6 w-[280px]">
              <Link to="/internships" className="flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-md">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span>Internships</span>
              </Link>
              <Link to="/projects" className="flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-md">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>Projects</span>
              </Link>
              <Link to="/startup-opportunities" className="flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-md">
                <Rocket className="h-4 w-4 text-muted-foreground" />
                <span>Startup Ideas</span>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Network</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-2 p-6 w-[280px]">
              <Link to="/talent-pool" className="flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-md">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>Talent Pool</span>
              </Link>
              <Link to="/vc-dashboard" className="flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-md">
                <Network className="h-4 w-4 text-muted-foreground" />
                <span>VC Dashboard</span>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-2 p-6 w-[280px]">
              <Link to="/blog" className="flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-md">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>Blog</span>
              </Link>
              <Link to="/about" className="flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-md">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span>About Us</span>
              </Link>
              <Link to="/faq" className="flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-md">
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                <span>FAQ</span>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationMenus;