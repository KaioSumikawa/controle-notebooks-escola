import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Menu,
  LogOut,
  CalendarDays,
} from 'lucide-react';

import { SearchBar } from '../SearchBar';

export function Header({
  title = 'Dashboard',
  onMenuClick,
  showSearch = false,
  searchPlaceholder = 'Pesquisar...',
  onSearchChange,
  searchValue = '',
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const menuRef = useRef(null);

  // Futuramente virá do Supabase
  const usuario = {
    nome: 'Administrador',
    email: 'admin@escola.edu.br',
  };

  const inicial = usuario.nome.charAt(0).toUpperCase();

  const dataAtual = useMemo(() => {
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date());
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () =>
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">

      <div className="flex items-center justify-between px-6 py-5">

        {/* Esquerda */}
        <div className="flex items-center gap-5">

          <button
            onClick={onMenuClick}
            className="lg:hidden rounded-xl p-2 hover:bg-slate-100 transition"
          >
            <Menu size={22} />
          </button>

          <div>

            <p className="text-sm text-slate-500">
              Bem-vindo ao sistema 👋
            </p>

            <h1 className="text-2xl font-bold text-slate-900">
              {title}
            </h1>

          </div>

        </div>

        {/* Centro */}
        {showSearch && (
          <div className="hidden lg:block w-full max-w-md px-8">
            <SearchBar
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) =>
                onSearchChange?.(e.target.value)
              }
            />
          </div>
        )}

        {/* Direita */}
        <div
          className="flex items-center gap-5"
          ref={menuRef}
        >

          {/* Data */}
          <div className="hidden xl:flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">

            <CalendarDays
              size={18}
              className="text-slate-500"
            />

            <span className="text-sm text-slate-600 capitalize">
              {dataAtual}
            </span>

          </div>

          {/* Usuário */}
          <div className="relative">

            <button
              onClick={() =>
                setShowUserMenu(!showUserMenu)
              }
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 hover:border-blue-300 hover:shadow-sm transition"
            >

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">

                {inicial}

              </div>

              <div className="hidden md:block text-left">

                <p className="text-sm font-semibold text-slate-900">
                  {usuario.nome}
                </p>

                <p className="text-xs text-slate-500">
                  Administrador
                </p>

              </div>

            </button>

            {showUserMenu && (

              <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

                <div className="border-b border-slate-100 p-5">

                  <p className="font-semibold text-slate-900">
                    {usuario.nome}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {usuario.email}
                  </p>

                </div>

                <button
                  onClick={() => console.log('logout')}
                  className="flex w-full items-center gap-3 px-5 py-4 text-sm text-red-600 hover:bg-red-50 transition"
                >

                  <LogOut size={18} />

                  Sair

                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </header>
  );
}