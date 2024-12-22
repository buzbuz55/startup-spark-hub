import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { motion } from "framer-motion";
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
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/talent-pool">
              <Button variant="ghost">Talent Pool</Button>
            </Link>
            <Link to="/projects">
              <Button variant="ghost">Projects</Button>
            </Link>
            <Link to="/submit-idea">
              <Button variant="default" className="gap-2">
                <ArrowUpRight className="w-4 h-4" />
                Apply
              </Button>
            </Link>
          </div>

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