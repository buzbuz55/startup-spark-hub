import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, User, FileText, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import UserProfileMenu from "./header/UserProfileMenu";
import MobileMenu from "./header/MobileMenu";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary transition-colors duration-300">
            Startup Spark Hub ✨
          </Link>
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <User className="w-4 h-4 mr-2" />
                  People
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <Link to="/talent-pool" className="block p-2 hover:bg-accent rounded-md transition-colors duration-300">
                      <div className="font-medium mb-1">Talent Pool</div>
                      <p className="text-sm text-muted-foreground">Browse our talented community</p>
                    </Link>
                    <Link to="/projects" className="block p-2 hover:bg-accent rounded-md transition-colors duration-300">
                      <div className="font-medium mb-1">Projects</div>
                      <p className="text-sm text-muted-foreground">Browse and join startup projects</p>
                    </Link>
                    <Link to="/vc-dashboard" className="block p-2 hover:bg-accent rounded-md transition-colors duration-300">
                      <div className="font-medium mb-1">VC Network</div>
                      <p className="text-sm text-muted-foreground">Connect with venture capitalists</p>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <FileText className="w-4 h-4 mr-2" />
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <Link to="/blog" className="block p-2 hover:bg-accent rounded-md transition-colors duration-300">
                      <div className="font-medium mb-1">Startup Blog</div>
                      <p className="text-sm text-muted-foreground">Latest startup insights and news</p>
                    </Link>
                    <Link to="/faq" className="block p-2 hover:bg-accent rounded-md transition-colors duration-300">
                      <div className="font-medium mb-1">FAQ</div>
                      <p className="text-sm text-muted-foreground">Common questions answered</p>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/submit-idea">
                  <Button variant="default" className="gap-2">
                    <ArrowUpRight className="w-4 h-4" />
                    Apply
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <nav className="flex items-center gap-4">
            <motion.button
              className="relative w-14 h-8 rounded-full bg-secondary p-1 shadow-inner transition-colors duration-300"
              onClick={toggleTheme}
              animate={{
                backgroundColor: theme === 'dark' ? '#1a1f2c' : '#f1f1f1'
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="w-6 h-6 rounded-full bg-primary shadow-md"
                animate={{
                  x: theme === 'dark' ? 24 : 0,
                  rotate: theme === 'dark' ? 45 : 0
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  duration: 0.3
                }}
              />
            </motion.button>

            <Link to="/messages" className="hidden sm:block">
              <Button variant="ghost" size="icon">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </Link>

            <div className="hidden md:block">
              <UserProfileMenu />
            </div>

            <MobileMenu profile={null} />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;