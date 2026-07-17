import { useState } from 'react';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={handleCloseSidebar}
      />

      {/* Área principal */}
      <div className="flex flex-1 flex-col min-w-0">

        {/* Header */}
        <Header
          title={title}
          onMenuClick={handleToggleSidebar}
          showSearch={showSearch}
          searchPlaceholder={searchPlaceholder}
          onSearchChange={onSearchChange}
          searchValue={searchValue}
        />

        {/* Conteúdo */}
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