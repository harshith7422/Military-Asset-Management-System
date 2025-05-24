import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, title }) => {
  const { currentUser } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="mr-4 text-gray-600 lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-[#0A2463]">{title}</h1>
      </div>

      <div className="flex items-center">
        <div className="relative mr-4 hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 px-4 py-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-transparent"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        <button className="mr-4 relative">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-[#990000] rounded-full"></span>
        </button>

        {currentUser && (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#0A2463] flex items-center justify-center text-white">
              <span className="text-sm font-semibold">{currentUser.name.charAt(0)}</span>
            </div>
            <div className="ml-2 hidden md:block">
              <p className="text-sm font-medium">{currentUser.name}</p>
              <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;