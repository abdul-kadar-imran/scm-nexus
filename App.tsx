
import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import { PageView, UserProfile } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = React.useState<PageView>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<UserProfile>({
    name: 'Sarah Jenkins',
    role: 'director',
    avatar: 'https://picsum.photos/seed/director/100/100',
    clearance: 'Lvl 1 - Admin'
  });

  // Sync theme class with state
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle Hash-based routing
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageView;
      if (['dashboard', 'inventory', 'orders', 'analytics', 'settings'].includes(hash)) {
        setCurrentView(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSetView = (view: PageView) => {
    window.location.hash = view;
    setCurrentView(view);
    setSearchQuery(''); 
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleUserSwitch = (role: 'director' | 'co-director') => {
    if (role === 'director') {
      setCurrentUser({
        name: 'Sarah Jenkins',
        role: 'director',
        avatar: 'https://picsum.photos/seed/director/100/100',
        clearance: 'Lvl 1 - Admin'
      });
    } else {
      setCurrentUser({
        name: 'Marcus Chen',
        role: 'co-director',
        avatar: 'https://picsum.photos/seed/codir/100/100',
        clearance: 'Lvl 2 - Operations'
      });
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard userRole={currentUser.role} />;
      case 'inventory': return <Inventory globalSearch={searchQuery} userRole={currentUser.role} />;
      case 'orders': return <Orders globalSearch={searchQuery} userRole={currentUser.role} />;
      case 'analytics': return <Analytics userRole={currentUser.role} />;
      case 'settings': return <Settings userRole={currentUser.role} />;
      default: return <Dashboard userRole={currentUser.role} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={handleSetView} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        currentUser={currentUser}
      />
      
      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col overflow-hidden">
        <Header 
          onMenuClick={() => setIsSidebarOpen(true)} 
          title={currentView}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isDark={isDarkMode}
          toggleTheme={toggleTheme}
          onNavigate={handleSetView}
          currentUser={currentUser}
          onUserSwitch={handleUserSwitch}
        />
        
        <div className="flex-1 overflow-y-auto">
          <div key={currentView + currentUser.role} className="animate-[fadeIn_0.3s_ease-out]">
            {renderContent()}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;
