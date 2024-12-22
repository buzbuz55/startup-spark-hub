import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const NavigationMenus = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Opportunities</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-2 p-4 w-[200px]">
              <Link to="/internships" className="block px-4 py-2 hover:bg-accent rounded-md">
                Internships
              </Link>
              <Link to="/projects" className="block px-4 py-2 hover:bg-accent rounded-md">
                Projects
              </Link>
              <Link to="/startup-opportunities" className="block px-4 py-2 hover:bg-accent rounded-md">
                Startup Ideas
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Network</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-2 p-4 w-[200px]">
              <Link to="/talent-pool" className="block px-4 py-2 hover:bg-accent rounded-md">
                Talent Pool
              </Link>
              <Link to="/vc-dashboard" className="block px-4 py-2 hover:bg-accent rounded-md">
                VC Dashboard
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-2 p-4 w-[200px]">
              <Link to="/blog" className="block px-4 py-2 hover:bg-accent rounded-md">
                Blog
              </Link>
              <Link to="/about" className="block px-4 py-2 hover:bg-accent rounded-md">
                About Us
              </Link>
              <Link to="/faq" className="block px-4 py-2 hover:bg-accent rounded-md">
                FAQ
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationMenus;