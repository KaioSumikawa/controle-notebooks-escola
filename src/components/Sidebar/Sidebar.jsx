import {
  Home,
  ClipboardList,
  Package,
  Laptop,
  Clock,
  BarChart3,
  Settings,
  Users,
  UserRound,
  Menu,
  LogOut,
} from 'lucide-react';

import { Link, useLocation } from 'react-router-dom';

export function Sidebar({
  isOpen = false,
  collapsed = false,
  onClose,
  onToggle,
}) {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: ClipboardList, label: 'Empréstimos', path: '/emprestimos' },
    { icon: Package, label: 'Devoluções', path: '/devolucoes' },
    { icon: Laptop, label: 'Notebooks', path: '/notebooks' },
    { icon: UserRound, label: 'Professores', path: '/professores' },
    { icon: Users, label: 'Turmas', path: '/turmas' },
    { icon: Clock, label: 'Histórico', path: '/historico' },
    { icon: BarChart3, label: 'Relatórios', path: '/relatorios' },
    { icon: Settings, label: 'Configurações', path: '/configuracoes' },
  ];

  const usuario = {
    nome: 'Administrador',
    cargo: 'Administrador',
  };

  const inicial = usuario.nome.charAt(0).toUpperCase();

  const isActive = (path) =>
    location.pathname === path;

  return (
    <>
      {/* Overlay Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-40
          flex
          h-screen
          flex-col
          border-r
          border-slate-200
          bg-white
          transition-all
          duration-300
          lg:relative

          ${collapsed ? 'w-20' : 'w-72'}

          ${
            isOpen
              ? 'translate-x-0'
              : '-translate-x-full lg:translate-x-0'
          }
        `}
      >
        {/* Topo da Sidebar */}
        <div
          className="
            flex
            h-20
            shrink-0
            items-center
            justify-center
          "
        >
          <button
            onClick={onToggle}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-slate-600
              transition
              hover:bg-slate-100
              hover:text-slate-900
            "
            title="Abrir/fechar menu"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Navegação */}
        <nav
          className={`
            flex-1
            space-y-2
            overflow-y-auto
            py-6

            ${collapsed ? 'px-2' : 'px-4'}
          `}
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    onClose?.();
                  }
                }}
                title={collapsed ? item.label : undefined}
                className={`
                  flex
                  items-center
                  rounded-xl
                  py-3
                  text-sm
                  font-medium
                  transition-all
                  duration-200

                  ${
                    collapsed
                      ? 'justify-center px-0'
                      : 'gap-3 px-4'
                  }

                  ${
                    active
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }
                `}
              >
                <Icon
                  size={20}
                  className={
                    active
                      ? 'text-blue-600'
                      : 'text-slate-400'
                  }
                />

                {!collapsed && (
                  <span>{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Usuário - Rodapé */}
        <div
          className="
            shrink-0
            p-4
          "
        >
          <div
            className={`
              flex
              items-center
              rounded-xl
              bg-slate-50
              p-3

              ${
                collapsed
                  ? 'justify-center'
                  : 'gap-3'
              }
            `}
          >
            {/* Avatar */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
              {inicial}
            </div>

            {/* Informações */}
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {usuario.nome}
                </p>

                <p className="truncate text-xs text-slate-500">
                  {usuario.cargo}
                </p>
              </div>
            )}

            {/* Logout */}
            {!collapsed && (
              <button
                onClick={() => console.log('logout')}
                title="Sair"
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-400
                  transition
                  hover:bg-red-50
                  hover:text-red-600
                "
              >
                <LogOut size={17} />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}