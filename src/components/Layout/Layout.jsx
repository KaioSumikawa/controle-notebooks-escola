import { useState, useEffect } from 'react';
import { Sidebar } from '../Sidebar';
import { Header } from '../Header';

export function Layout({
  children,
  title = 'Dashboard',
  showSearch = false,
  searchPlaceholder = 'Pesquisar...',
  onSearchChange,
  searchValue = '',
}) {
  // Sidebar Mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sidebar Desktop
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const isDesktop = () =>
    typeof window !== 'undefined' &&
    window.innerWidth >= 1024;

  const handleToggleSidebar = () => {
    if (isDesktop()) {
      setSidebarCollapsed((prev) => !prev);
    } else {
      setSidebarOpen((prev) => !prev);
    }
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (isDesktop()) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        collapsed={sidebarCollapsed}
        onClose={handleCloseSidebar}
      />

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header
          onMenuClick={handleToggleSidebar}
          sidebarCollapsed={sidebarCollapsed}
          showSearch={showSearch}
          searchPlaceholder={searchPlaceholder}
          onSearchChange={onSearchChange}
          searchValue={searchValue}
        />

        {/* Main */}
        <main className="flex-1 overflow-y-auto">
          <div
            className="
              mx-auto
              w-full
              max-w-screen-2xl
              px-5
              py-6
              md:px-8
              lg:px-10
              animate-fade-in
            "
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}