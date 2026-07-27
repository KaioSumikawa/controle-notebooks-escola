import { Search, X } from 'lucide-react';

export function SearchBar({
  placeholder = 'Pesquisar...',
  value = '',
  onChange,
}) {
  const handleClear = () => {
    onChange?.({
      target: {
        value: '',
      },
    });
  };

  return (
    <div className="relative w-full">
      {/* Ícone */}
      <Search
        size={20}
        strokeWidth={2}
        className="
          pointer-events-none
          absolute
          left-5
          top-1/2
          -translate-y-1/2
          text-slate-400
          transition-colors
          duration-200
        "
      />

      {/* Campo */}
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        aria-label="Pesquisar"
        className="
          h-16
          w-full

          rounded-2xl
          border
          border-slate-200

          bg-white

          pl-14
          pr-14

          text-[15px]
          font-medium
          text-slate-700

          placeholder:text-slate-400

          shadow-sm

          outline-none

          transition-all
          duration-200

          hover:border-slate-300
          hover:shadow-md

          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-500/10
          focus:shadow-md
        "
      />

      {/* Limpar */}
      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Limpar pesquisa"
          className="
            absolute
            right-4
            top-1/2

            flex
            h-9
            w-9
            -translate-y-1/2
            items-center
            justify-center

            rounded-full

            text-slate-400

            transition-all
            duration-200

            hover:bg-slate-100
            hover:text-slate-700

            active:scale-95

            focus:outline-none
            focus:ring-2
            focus:ring-blue-500/20
          "
        >
          <X
            size={16}
            strokeWidth={2}
          />
        </button>
      )}
    </div>
  );
}