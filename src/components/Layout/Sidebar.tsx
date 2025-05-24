import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Repeat, 
  UserCheck, 
  LogOut,
  Shield,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import clsx from 'clsx';

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, isOpen, toggle }) => {
  const { currentUser, logout } = useAuth();

  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/', 
      icon: <LayoutDashboard className="w-5 h-5" />,
      roles: ['admin', 'commander', 'logistics']
    },
    { 
      name: 'Purchases', 
      path: '/purchases', 
      icon: <ShoppingCart className="w-5 h-5" />,
      roles: ['admin', 'commander', 'logistics']
    },
    { 
      name: 'Transfers', 
      path: '/transfers', 
      icon: <Repeat className="w-5 h-5" />,
      roles: ['admin', 'commander', 'logistics']
    },
    { 
      name: 'Assignments & Expenditures', 
      path: '/assignments', 
      icon: <UserCheck className="w-5 h-5" />,
      roles: ['admin', 'commander']
    },
    { 
      name: 'Admin Settings', 
      path: '/admin', 
      icon: <Shield className="w-5 h-5" />,
      roles: ['admin']
    },
  ];

  const filteredNavItems = currentUser 
    ? navItems.filter(item => item.roles.includes(currentUser.role))
    : [];

  return (
    <div 
      className={clsx(
        "bg-[#0A2463] text-white h-screen flex flex-col transition-all duration-300",
        isMobile ? (isOpen ? "fixed inset-0 z-50 w-64" : "fixed -left-64 inset-y-0 z-50 w-64") : "w-64"
      )}
    >
      {isMobile && (
        <button 
          onClick={toggle}
          className="absolute right-4 top-4 text-white"
        >
          <X className="w-6 h-6" />
        </button>
      )}

      <div className="p-6 border-b border-blue-800">
        <div className="flex items-center">
          <Shield className="w-8 h-8 text-[#FFD700] mr-3" />
          <h1 className="text-xl font-bold">MAMS</h1>
        </div>
        <p className="text-sm text-blue-300 mt-1">Military Asset Management</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {filteredNavItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={isMobile ? toggle : undefined}
                className={({ isActive }) => clsx(
                  "flex items-center px-6 py-3 text-sm",
                  isActive 
                    ? "bg-blue-800 border-l-4 border-[#FFD700]" 
                    : "hover:bg-blue-900"
                )}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {currentUser && (
        <div className="p-4 border-t border-blue-800">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center mr-3">
              <span className="text-lg font-semibold">
                {currentUser.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-medium">{currentUser.name}</p>
              <p className="text-xs text-blue-300 capitalize">{currentUser.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center px-4 py-2 text-sm bg-blue-800 rounded hover:bg-blue-700 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;