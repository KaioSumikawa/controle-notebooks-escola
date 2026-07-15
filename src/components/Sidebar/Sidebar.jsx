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
  ChevronRight,
} from 'lucide-react';

import {
  Link,
  useLocation,
} from 'react-router-dom';

import { useState } from 'react';


export function Sidebar({
  isOpen = false,
  onClose,
}) {

  const location = useLocation();

  const [isExpanded, setIsExpanded] = useState(true);



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



  const isActive = (path) => {
    return location.pathname === path;
  };



  return (
    <>

      {/* Overlay Mobile */}
      {
        isOpen && (
          <div
            className="
              fixed
              inset-0
              bg-black/50
              lg:hidden
              z-30
            "
            onClick={onClose}
          />
        )
      }



      {/* Sidebar */}
      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          bg-gray-900
          text-white
          z-40
          transition-all
          duration-300

          ${
            isOpen
              ? 'translate-x-0'
              : '-translate-x-full lg:translate-x-0'
          }

          ${
            isExpanded
              ? 'w-64'
              : 'lg:w-20'
          }
        `}
      >


        {/* Header Mobile */}
        <div
          className="
            flex
            justify-end
            p-4
            lg:hidden
          "
        >

          <button
            type="button"
            onClick={onClose}
            className="
              p-2
              rounded-lg
              hover:bg-gray-800
              transition-colors
            "
            aria-label="Fechar menu"
          >

            <X size={20} />

          </button>

        </div>



        {/* Menu */}
        <nav
          className="
            px-4
            py-6
            space-y-2
            overflow-y-auto
          "
        >

          {
            menuItems.map((item) => {

              const Icon = item.icon;


              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  title={
                    !isExpanded
                      ? item.label
                      : undefined
                  }
                  className={`
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-lg
                    transition-colors

                    ${
                      isActive(item.path)
                        ? 'bg-blue-600 text-white'
                        : `
                          text-gray-300
                          hover:bg-gray-800
                        `
                    }

                    ${
                      !isExpanded
                        ? 'justify-center'
                        : ''
                    }
                  `}
                >

                  <Icon
                    size={20}
                    className="flex-shrink-0"
                  />


                  {
                    isExpanded && (
                      <span className="text-sm font-medium">
                        {item.label}
                      </span>
                    )
                  }


                </Link>
              );

            })
          }


        </nav>




        {/* Footer */}
        <div
          className="
            absolute
            bottom-0
            left-0
            w-full
            border-t
            border-gray-800
            p-4
          "
        >

          <button
            type="button"
            onClick={() =>
              setIsExpanded((prev) => !prev)
            }
            className="
              hidden
              lg:flex
              w-full
              items-center
              justify-center
              p-2
              rounded-lg
              text-gray-300
              hover:bg-gray-800
              transition-colors
            "
            aria-label="Expandir menu"
          >

            <ChevronRight
              size={20}
              className={`
                transition-transform

                ${
                  !isExpanded
                    ? 'rotate-180'
                    : ''
                }
              `}
            />

          </button>



          <p
            className="
              text-xs
              text-gray-500
              text-center
              mt-2
            "
          >
            v1.0.0
          </p>


        </div>


      </aside>



      {/* Espaço desktop */}
      <div
        className={`
          hidden
          lg:block
          transition-all
          duration-300

          ${
            isExpanded
              ? 'w-64'
              : 'w-20'
          }
        `}
      />


    </>
  );
}