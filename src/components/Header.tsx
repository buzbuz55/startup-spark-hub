import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserCircle, LogIn, UserPlus, MessageSquare, User, FileText, ArrowUpRight, Menu } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = false;
  const userProfile = {
    name: "John Doe",
    role: "Venture Capitalist",
    avatar: "/placeholder.svg"
  };

  const MobileMenu = () => (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4">
          <Link to="/talent-pool" className="block p-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
            Talent Pool
          </Link>
          <Link to="/projects" className="block p-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
            Projects
          </Link>
          <Link to="/vc-dashboard" className="block p-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
            VC Network
          </Link>
          <Link to="/blog" className="block p-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
            Blog
          </Link>
          <Link to="/faq" className="block p-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
            FAQ
          </Link>
          <div className="border-t my-4"></div>
          {isLoggedIn ? (
            <>
              <Button variant="ghost" className="justify-start" onClick={() => setIsOpen(false)}>
                <UserCircle className="mr-2 h-4 w-4" />
                Profile Settings
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => setIsOpen(false)}>
                Portfolio
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => setIsOpen(false)}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsOpen(false)}>
                <Button variant="default" className="w-full justify-start">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );

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
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2">
                      <UserCircle className="w-5 h-5" />
                      {userProfile.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                    <DropdownMenuItem>Portfolio</DropdownMenuItem>
                    <DropdownMenuItem>Sign Out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <Button variant="ghost" className="gap-2">
                      <LogIn className="w-4 h-4" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="default" className="gap-2">
                      <UserPlus className="w-4 h-4" />
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            <MobileMenu />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;