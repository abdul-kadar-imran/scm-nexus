
import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Moon, Sun, Menu, ChevronDown, Globe, Check, Trash2, Package, Clock, AlertTriangle, User, Shield, LogOut } from 'lucide-react';
import { PageView, UserProfile } from '../types';

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
  onNavigate: (view: PageView) => void;
  currentUser: UserProfile;
  onUserSwitch: (role: 'director' | 'co-director') => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onMenuClick, 
  title, 
  searchQuery, 
  setSearchQuery, 
  isDark, 
  toggleTheme, 
  onNavigate,
  currentUser,
  onUserSwitch
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Critical Stock Alert', message: 'SKU-012-B is below minimum threshold.', type: 'alert', time: '5m ago', read: false, target: 'inventory' as PageView },
    { id: 2, title: 'New Order Received', message: 'Order ORD-7729 from Prime Tech.', type: 'order', time: '12m ago', read: false, target: 'orders' as PageView },
    { id: 3, title: 'Shipment Delayed', message: 'Cargo Flight 402 delayed due to weather.', type: 'shipping', time: '1h ago', read: true, target: 'dashboard' as PageView },
  ]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (id: number, target: PageView) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    onNavigate(target);
    setShowNotifications(false);
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-16 flex items-center px-4 lg:px-8 transition-colors">
      <div className="flex-1 flex items-center gap-4">
        <button 
          className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white capitalize hidden md:block">
          {title}
        </h1>
      </div>

      <div className="flex-1 max-w-xl mx-4 hidden lg:block">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search across current view..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-slate-200 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all active:scale-90"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-slate-600" />}
        </button>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative group transition-all active:scale-90"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white dark:ring-slate-900">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h3 className="font-bold text-sm">Notifications</h3>
                <div className="flex gap-2">
                  <button onClick={markAllRead} className="text-[10px] text-blue-600 font-bold hover:underline">Mark read</button>
                  <button onClick={clearNotifications} className="text-[10px] text-slate-400 font-bold hover:text-red-500"><Trash2 size={12} /></button>
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map(n => (
                    <div 
                      key={n.id} 
                      onClick={() => handleNotificationClick(n.id, n.target)}
                      className={`p-4 border-b border-slate-50 dark:border-slate-800 flex gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${!n.read ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        n.type === 'alert' ? 'bg-red-100 text-red-600' : 
                        n.type === 'order' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                      }`}>
                        {n.type === 'alert' ? <AlertTriangle size={14} /> : n.type === 'order' ? <Package size={14} /> : <Clock size={14} />}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-900 dark:text-white">{n.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{n.message}</p>
                        <p className="text-[10px] text-slate-400 mt-1 font-medium">{n.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <Check size={32} className="mx-auto text-slate-200 mb-2" />
                    <p className="text-xs text-slate-500 font-medium">No new notifications</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1"></div>

        <div className="relative" ref={userMenuRef}>
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 pl-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
          >
            <div className="flex flex-col items-end mr-1 hidden sm:flex">
              <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">{currentUser.name}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">{currentUser.role === 'director' ? 'Director' : 'Co-Director'}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden ring-2 ring-blue-500/20">
              <img src={currentUser.avatar} alt={currentUser.name} />
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-2">
              <p className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Switch Account</p>
              <button 
                onClick={() => { onUserSwitch('director'); setShowUserMenu(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${currentUser.role === 'director' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                <Shield size={16} />
                <div className="text-left">
                  <p className="font-bold leading-tight">Sarah Jenkins</p>
                  <p className="text-[10px] opacity-70">Director Level</p>
                </div>
              </button>
              <button 
                onClick={() => { onUserSwitch('co-director'); setShowUserMenu(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors mt-1 ${currentUser.role === 'co-director' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                <User size={16} />
                <div className="text-left">
                  <p className="font-bold leading-tight">Marcus Chen</p>
                  <p className="text-[10px] opacity-70">Co-Director Level</p>
                </div>
              </button>
              <div className="h-[1px] bg-slate-100 dark:bg-slate-800 my-2" />
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <LogOut size={16} />
                <span className="font-bold">Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
