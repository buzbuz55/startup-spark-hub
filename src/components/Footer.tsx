import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Info, Facebook, Twitter, Linkedin, Instagram, Youtube, Github, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Startup Spark</h3>
            <p className="text-gray-400">
              An online community focused on helping entrepreneurs and innovators make the world a better place by sparking their startups.
            </p>
            <div className="mt-4 space-y-2">
              <Link to="/about">
                <Button 
                  variant="default" 
                  className="bg-purple-600 hover:bg-purple-700 text-white gap-2 w-full"
                >
                  <Info className="w-4 h-4 mr-2" />
                  About Startup Spark
                </Button>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: contact@startupspark.org</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Location: 1755 Broadway, New York NYC</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="grid grid-cols-3 gap-4">
              <a 
                href="https://facebook.com/startupnation" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center p-3 rounded-lg bg-gray-800 hover:bg-blue-600 transition-all duration-300 group"
              >
                <Facebook className="w-6 h-6 text-gray-400 group-hover:text-white" />
              </a>
              <a 
                href="https://twitter.com/startupnation" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center p-3 rounded-lg bg-gray-800 hover:bg-sky-500 transition-all duration-300 group"
              >
                <Twitter className="w-6 h-6 text-gray-400 group-hover:text-white" />
              </a>
              <a 
                href="https://linkedin.com/company/startupnation" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center p-3 rounded-lg bg-gray-800 hover:bg-blue-700 transition-all duration-300 group"
              >
                <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-white" />
              </a>
              <a 
                href="https://instagram.com/startupnation" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center p-3 rounded-lg bg-gray-800 hover:bg-pink-600 transition-all duration-300 group"
              >
                <Instagram className="w-6 h-6 text-gray-400 group-hover:text-white" />
              </a>
              <a 
                href="https://youtube.com/startupnation" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center p-3 rounded-lg bg-gray-800 hover:bg-red-600 transition-all duration-300 group"
              >
                <Youtube className="w-6 h-6 text-gray-400 group-hover:text-white" />
              </a>
              <a 
                href="https://github.com/startupnation" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center p-3 rounded-lg bg-gray-800 hover:bg-purple-600 transition-all duration-300 group"
              >
                <Github className="w-6 h-6 text-gray-400 group-hover:text-white" />
              </a>
              <a 
                href="https://discord.gg/4xjVbtNH" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center p-3 rounded-lg bg-gray-800 hover:bg-[#5865F2] transition-all duration-300 group"
              >
                <MessageCircle className="w-6 h-6 text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Startup Spark. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;