import { useEffect, useMemo, useRef, useState } from 'react';
import { LogOut, CalendarDays } from 'lucide-react';
import { SearchBar } from '../SearchBar';

export function Header({
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

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
  }, []);

  return (
    <header className="sticky top-0 z-30 h-20 w-full shrink-0 border-b border-slate-200 bg-white">

      <div className="flex h-full items-center justify-between px-6">

        {/* Esquerda */}
        <div className="flex flex-1 items-center">

          {showSearch && (
            <div className="w-full max-w-xl">
              <SearchBar
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) =>
                  onSearchChange?.(e.target.value)
                }
              />
            </div>
          )}

        </div>

        {/* Direita */}
        <div
          className="flex items-center gap-4"
          ref={menuRef}
        >

          {/* Data */}
          <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 xl:flex">

            <CalendarDays
              size={16}
              className="text-slate-500"
            />

            <span className="text-xs font-medium capitalize text-slate-600">
              {dataAtual}
            </span>

          </div>

          {/* Usuário */}
          <div className="relative">

            <button
              onClick={() =>
                setShowUserMenu((prev) => !prev)
              }
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-3
                py-2
                transition-all
                duration-200
                hover:border-slate-300
                hover:shadow-sm
              "
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white shadow-sm">
                {inicial}
              </div>

              <div className="hidden text-left md:block">

                <p className="text-xs font-semibold text-slate-800">
                  {usuario.nome}
                </p>

                <p className="text-[11px] text-slate-500">
                  Administrador
                </p>

              </div>

            </button>

            {showUserMenu && (

              <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">

                <div className="border-b border-slate-100 p-3">

                  <p className="text-xs font-semibold text-slate-900">
                    {usuario.nome}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {usuario.email}
                  </p>

                </div>

                <button
                  onClick={() => console.log('logout')}
                  className="mt-1 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
                >

                  <LogOut size={16} />

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