import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import UserProfileMenu from "./header/UserProfileMenu";
import MobileMenu from "./header/MobileMenu";
import NavigationMenus from "./header/NavigationMenus";
import HeaderActions from "./header/HeaderActions";

const Header = () => {
  const isMobile = useIsMobile();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Startup Spark✨
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenus />
          </div>

          <nav className="flex items-center gap-2 md:gap-4">
            {!isMobile && <HeaderActions />}
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