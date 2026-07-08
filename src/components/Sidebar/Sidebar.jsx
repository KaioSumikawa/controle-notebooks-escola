import {
  Home,
  ClipboardList,
  Package,
  Laptop,
  Clock,
  BarChart3,
  Settings,
  Users,
  X,
  ChevronRight,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export function Sidebar({ isOpen = true, onClose }) {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    {
      icon: Home,
      label: 'Dashboard',
      path: '/',
      active: location.pathname === '/',
    },
    {
      icon: ClipboardList,
      label: 'Empréstimos',
      path: '/emprestimos',
      active: location.pathname === '/emprestimos',
    },
    {
      icon: Package,
      label: 'Devoluções',
      path: '/devolucoes',
      active: location.pathname === '/devolucoes',
    },
    {
      icon: Laptop,
      label: 'Notebooks',
      path: '/notebooks',
      active: location.pathname === '/notebooks',
    },
    {
      icon: Users,
      label: 'Turmas',
      path: '/turmas',
      active: location.pathname === '/turmas',
    },
    {
      icon: Clock,
      label: 'Histórico',
      path: '/historico',
      active: location.pathname === '/historico',
    },
    {
      icon: BarChart3,
      label: 'Relatórios',
      path: '/relatorios',
      active: location.pathname === '/relatorios',
    },
    {
      icon: Settings,
      label: 'Configurações',
      path: '/configuracoes',
      active: location.pathname === '/configuracoes',
    },
  ];

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen bg-gray-900 text-white transition-all duration-300 z-40
          ${isOpen ? 'w-64' : '-translate-x-full lg:translate-x-0 lg:w-64'}
          ${isExpanded ? 'lg:w-64' : 'lg:w-20'}
        `}
      >
        {/* Botão de fechar (mobile) */}
        <div className="flex justify-end p-4 lg:hidden">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => onClose?.()}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  sidebar-nav-item
                  ${
                    item.active
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }
                `}
                title={!isExpanded ? item.label : ''}
              >
                <Icon size={20} className="flex-shrink-0" />

                <span
                  className={`transition-all ${
                    isExpanded ? 'block' : 'lg:hidden'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-800 px-4 py-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden lg:flex w-full items-center justify-center gap-2 py-2 hover:bg-gray-800 rounded-lg text-gray-300 transition-colors"
          >
            <ChevronRight
              size={20}
              className={`transition-transform ${
                !isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>

          <p className="text-xs text-gray-500 text-center mt-2">
            v1.0.0
          </p>
        </div>
      </aside>

      {/* Spacer */}
      <div
        className={`hidden lg:block ${
          isExpanded ? 'w-64' : 'w-20'
        } transition-all duration-300`}
      />
    </>
  );
}