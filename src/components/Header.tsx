import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-purple-600">
            Startup Spark Hub
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/submit-idea">
              <Button variant="ghost">Submit Idea</Button>
            </Link>
            <Link to="/talent-pool">
              <Button variant="ghost">Talent Pool</Button>
            </Link>
            <Link to="/vc-dashboard">
              <Button variant="ghost">VC Dashboard</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;