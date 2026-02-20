
import React from 'react';
import { LayoutDashboard, Package, ShoppingCart, BarChart3, Settings, ShieldCheck, LogOut, Menu, X, User } from 'lucide-react';
import { PageView, UserProfile } from '../types';

interface SidebarProps {
  currentView: PageView;
  setCurrentView: (view: PageView) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentUser: UserProfile;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isOpen, setIsOpen, currentUser }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'inventory', label: 'Inventory', icon: <Package size={20} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const handleNavClick = (view: PageView) => {
    setCurrentView(view);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 z-50 h-screen w-64 
        bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl
        border-r border-slate-200 dark:border-slate-800
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                N
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Nexus<span className="text-blue-600">SCM</span></span>
            </div>
            <button className="lg:hidden" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 space-y-1 py-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id as PageView)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${currentView === item.id 
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}
                `}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Footer Section */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 overflow-hidden ring-2 ring-blue-500/20">
                <img src={currentUser.avatar} alt={currentUser.name} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold truncate dark:text-slate-200">{currentUser.name}</p>
                <p className="text-[10px] text-slate-500 truncate font-bold uppercase tracking-widest">{currentUser.clearance}</p>
              </div>
              {currentUser.role === 'director' ? (
                <ShieldCheck size={16} className="text-blue-500" />
              ) : (
                <User size={16} className="text-emerald-500" />
              )}
            </div>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-red-600 transition-colors">
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
