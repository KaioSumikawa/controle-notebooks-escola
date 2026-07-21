import {
  Search,
  Bell,
  Grid3X3,
} from 'lucide-react';

export function Header() {
  return (
    <header
      className="
        pointer-events-none
        absolute
        right-0
        top-0
        z-30
      "
    >
      <div className="flex items-center px-6 py-4">

        <div
          className="
            pointer-events-auto
            flex
            items-center
            gap-5
          "
        >

          {/* Pesquisar */}
          <button
            type="button"
            title="Pesquisar"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-slate-500
              transition
              duration-200
              hover:bg-slate-200/70
              hover:text-slate-900
            "
          >
            <Search
              size={24}
              strokeWidth={1.8}
            />
          </button>

          {/* Notificações */}
          <button
            type="button"
            title="Notificações"
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-slate-500
              transition
              duration-200
              hover:bg-slate-200/70
              hover:text-slate-900
            "
          >
            <Bell
              size={24}
              strokeWidth={1.8}
            />

            <span
              className="
                absolute
                right-1.5
                top-1.5
                h-2
                w-2
                rounded-full
                bg-blue-600
                ring-2
                ring-slate-100
              "
            />
          </button>

          {/* Menu de aplicações */}
          <button
            type="button"
            title="Menu"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-slate-500
              transition
              duration-200
              hover:bg-slate-200/70
              hover:text-slate-900
            "
          >
            <Grid3X3
              size={23}
              strokeWidth={1.8}
            />
          </button>

        </div>

      </div>
    </header>
  );
}