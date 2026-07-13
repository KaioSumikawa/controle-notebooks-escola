import { Menu, LogOut } from 'lucide-react';
import { SearchBar } from '../SearchBar';
import { useState } from 'react';

export function Header({
  title = 'Dashboard',
  onMenuClick,
  showSearch = false,
  searchPlaceholder = 'Pesquisar...',
  onSearchChange,
  searchValue = '',
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Futuramente esses dados virão do Supabase Auth
  const usuario = {
    nome: 'Administrador',
    email: 'admin@escola.edu.br',
  };

  const inicial = usuario.nome.charAt(0).toUpperCase();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left side - Menu e Título */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Menu"
          >
            <Menu size={20} className="text-gray-600" />
          </button>

          <h1 className="text-xl font-semibold text-gray-900 whitespace-nowrap">
            {title}
          </h1>
        </div>

        {/* Search Bar (Opcional) */}
        {showSearch && (
          <div className="hidden md:block flex-1 max-w-md mx-6">
            <SearchBar
              placeholder={searchPlaceholder}
              onChange={(e) => onSearchChange?.(e.target.value)}
              value={searchValue}
            />
          </div>
        )}

        {/* Avatar */}
        <div className="relative ml-4">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold hover:ring-2 ring-offset-2 ring-blue-300 transition-all"
          >
            {inicial}
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-slide-in">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">
                  {usuario.nome}
                </p>
                <p className="text-xs text-gray-500">
                  {usuario.email}
                </p>
              </div>

              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors">
                <LogOut size={16} />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}