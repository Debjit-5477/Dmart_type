import { Bell, Search, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserProfile from './UserProfile';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="bg-navy-900 border-b border-gray-800 z-30">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="p-2 mr-2 rounded-md text-gray-400 hover:text-white hover:bg-navy-800"
          >
            <Menu size={24} />
          </button>
          
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">DMART<span className="text-primary-500">.</span></span>
          </Link>
          
          {!isMobile && (
            <nav className="hidden md:flex ml-8 space-x-1">
              <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-navy-800 rounded-md">
                Executive Summary
              </Link>
              <Link to="/audit-metrics" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-navy-800 rounded-md">
                DM Audit Metrics
              </Link>
              <Link to="/conversion-metrics" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-navy-800 rounded-md">
                Conversion Metrics
              </Link>
              <Link to="/database-config" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-navy-800 rounded-md">
                Database Config
              </Link>
            </nav>
          )}
        </div>
        
        <div className="flex items-center">
          <div className="relative max-w-md mr-4 hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-navy-800 text-white border border-gray-700 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          
          <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-navy-800 relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
          </button>
          
          <UserProfile />
          
          {isMobile && (
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 ml-2 rounded-md text-gray-400 hover:text-white hover:bg-navy-800 md:hidden"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobile && menuOpen && (
        <div className="md:hidden bg-navy-900 border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-white bg-navy-800 rounded-md">
              Executive Summary
            </Link>
            <Link to="/audit-metrics" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-navy-800 rounded-md">
              DM Audit Metrics
            </Link>
            <Link to="/conversion-metrics" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-navy-800 rounded-md">
              Conversion Metrics
            </Link>
            <Link to="/database-config" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-navy-800 rounded-md">
              Database Config
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;