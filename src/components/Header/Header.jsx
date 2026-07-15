import { useEffect, useRef, useState } from 'react';
import { Menu, LogOut } from 'lucide-react';
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


  // Futuramente virá do Supabase Auth
  const usuario = {
    nome: 'Administrador',
    email: 'admin@escola.edu.br',
  };


  const inicial =
    usuario.nome
      .charAt(0)
      .toUpperCase();



  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowUserMenu(false);
      }

    };


    document.addEventListener(
      'mousedown',
      handleClickOutside
    );


    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };

  }, []);



  const handleToggleUserMenu = () => {
    setShowUserMenu((prev) => !prev);
  };


  const handleLogout = () => {
    // Futuramente integrar com Supabase Auth
    console.log('Logout');
  };


  return (
    <header
      className="
        bg-white
        border-b
        border-gray-200
        sticky
        top-0
        z-40
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
          h-16
          px-4
          md:px-6
          gap-4
        "
      >


        {/* Menu + Título */}
        <div className="flex items-center gap-4 min-w-0">


          <button
            type="button"
            onClick={onMenuClick}
            className="
              lg:hidden
              p-2
              rounded-lg
              hover:bg-gray-100
              transition-colors
            "
            aria-label="Abrir menu"
          >

            <Menu
              size={22}
              className="text-gray-600"
            />

          </button>



          <h1
            className="
              text-lg
              md:text-xl
              font-semibold
              text-gray-900
              truncate
            "
          >
            {title}
          </h1>


        </div>



        {/* Pesquisa */}
        {
          showSearch && (
            <div
              className="
                hidden
                md:block
                flex-1
                max-w-md
              "
            >

              <SearchBar
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) =>
                  onSearchChange?.(e.target.value)
                }
              />

            </div>
          )
        }



        {/* Usuário */}
        <div
          className="relative"
          ref={menuRef}
        >

          <button
            type="button"
            onClick={handleToggleUserMenu}
            className="
              w-10
              h-10
              rounded-full
              bg-blue-600
              flex
              items-center
              justify-center
              text-white
              font-semibold
              hover:ring-2
              hover:ring-blue-300
              transition-all
            "
            aria-expanded={showUserMenu}
            aria-label="Abrir menu do usuário"
          >

            {inicial}

          </button>



          {
            showUserMenu && (
              <div
                className="
                  absolute
                  right-0
                  mt-2
                  w-60
                  bg-white
                  rounded-lg
                  shadow-lg
                  border
                  border-gray-200
                  py-2
                "
              >

                <div
                  className="
                    px-4
                    py-3
                    border-b
                    border-gray-100
                  "
                >

                  <p
                    className="
                      text-sm
                      font-semibold
                      text-gray-900
                    "
                  >
                    {usuario.nome}
                  </p>


                  <p
                    className="
                      text-xs
                      text-gray-500
                    "
                  >
                    {usuario.email}
                  </p>

                </div>



                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    w-full
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    text-sm
                    text-red-600
                    hover:bg-red-50
                    transition-colors
                  "
                >

                  <LogOut size={16} />

                  Sair

                </button>


              </div>
            )
          }


        </div>


      </div>

    </header>
  );
}