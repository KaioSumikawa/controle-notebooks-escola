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
  X,
 MonitorSmartphone,
} from 'lucide-react';

import {
  Link,
  useLocation,
} from 'react-router-dom';

export function Sidebar({
  isOpen = false,
  onClose,
}) {
  const location = useLocation();

  const menuItems = [
    {
      icon: Home,
      label: 'Dashboard',
      path: '/',
    },
    {
      icon: ClipboardList,
      label: 'Empréstimos',
      path: '/emprestimos',
    },
    {
      icon: Package,
      label: 'Devoluções',
      path: '/devolucoes',
    },
    {
      icon: Laptop,
      label: 'Notebooks',
      path: '/notebooks',
    },
    {
      icon: UserRound,
      label: 'Professores',
      path: '/professores',
    },
    {
      icon: Users,
      label: 'Turmas',
      path: '/turmas',
    },
    {
      icon: Clock,
      label: 'Histórico',
      path: '/historico',
    },
    {
      icon: BarChart3,
      label: 'Relatórios',
      path: '/relatorios',
    },
    {
      icon: Settings,
      label: 'Configurações',
      path: '/configuracoes',
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          flex
          h-screen
          w-72
          flex-col
          border-r
          border-slate-200
          bg-white
          transition-transform
          duration-300

          ${
            isOpen
              ? 'translate-x-0'
              : '-translate-x-full lg:translate-x-0'
          }
        `}
      >
        {/* Mobile */}
        <div className="flex justify-end p-4 lg:hidden">
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Logo */}
        <div className="px-7 pt-8 pb-7 border-b border-slate-200">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">

              <MonitorSmartphone size={24} />

            </div>

            <div>

              <h1 className="text-lg font-bold text-slate-900">
                Controle de
                <br />
                Notebooks
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Sistema Escolar
              </p>

            </div>

          </div>

        </div>

        {/* Navegação */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`
                  group
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-medium
                  transition-all
                  duration-200

                  ${
                    isActive(item.path)
                      ? `
                        bg-blue-50
                        text-blue-700
                      `
                      : `
                        text-slate-600
                        hover:bg-slate-100
                        hover:text-slate-900
                      `
                  }
                `}
              >

                <Icon
                  size={20}
                  className={`
                    ${
                      isActive(item.path)
                        ? 'text-blue-600'
                        : 'text-slate-400 group-hover:text-slate-700'
                    }
                  `}
                />

                <span>{item.label}</span>

              </Link>
            );

          })}

        </nav>

        {/* Rodapé */}
        <div className="border-t border-slate-200 p-5">

          <div className="rounded-xl bg-slate-50 p-4">

            <p className="text-sm font-semibold text-slate-900">
              Administrador
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Sistema de Controle de Notebooks
            </p>

            <p className="mt-3 text-xs text-slate-400">
              Versão 1.0.0
            </p>

          </div>

        </div>

      </aside>

      {/* Espaço Desktop */}
      <div className="hidden lg:block w-72 flex-shrink-0" />
    </>
  );
}