import { useState } from 'react';
import { User, LogOut, Settings } from 'lucide-react';

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative ml-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
          <User size={18} />
        </div>
      </button>

      {isOpen && (
        <div 
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-navy-800 ring-1 ring-black ring-opacity-5 z-50"
          onClick={() => setIsOpen(false)}
        >
          <div className="py-1">
            <div className="block px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
              <p className="font-medium">Admin User</p>
              <p className="text-xs text-gray-400">admin@example.com</p>
            </div>
            <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-navy-700 flex items-center">
              <Settings size={16} className="mr-2" />
              Account Settings
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-navy-700 flex items-center">
              <LogOut size={16} className="mr-2" />
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;