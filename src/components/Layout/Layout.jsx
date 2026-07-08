import { Sidebar } from '../Sidebar';
import { Header } from '../Header';
import { useState } from 'react';

export function Layout({ 
  children, 
  title = 'Dashboard',
  onSearchChange,
  searchValue = ''
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // Lógica para aplicar tema escuro será implementada futuramente
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          title={title}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          isDarkMode={isDarkMode}
          onThemeToggle={handleThemeToggle}
          onSearchChange={onSearchChange}
          searchValue={searchValue}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
