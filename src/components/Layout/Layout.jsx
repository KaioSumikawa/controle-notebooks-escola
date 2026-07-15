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
    <div className="flex min-h-screen w-full bg-gray-50 overflow-hidden">


      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={handleCloseSidebar}
      />


      {/* Área principal */}
      <div className="flex-1 flex flex-col min-w-0">


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
        <main
          className="
            flex-1
            overflow-y-auto
            bg-gray-50
          "
        >

          <div
            className="
              w-full
              max-w-7xl
              mx-auto
              p-4
              md:p-6
            "
          >

            {children}

          </div>

        </main>


      </div>


    </div>
  );
}