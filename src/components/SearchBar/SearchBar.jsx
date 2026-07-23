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
        size={19}
        strokeWidth={2}
        className="
          pointer-events-none
          absolute
          left-4
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
          h-13
          w-full
          rounded-2xl
          border
          border-slate-200
          bg-slate-50

          pl-12
          pr-12

          text-sm
          font-medium
          text-slate-700

          placeholder:text-slate-500

          shadow-sm

          outline-none

          transition-all
          duration-200

          hover:border-slate-300
          hover:bg-white
          hover:shadow

          focus:bg-white
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
            right-3
            top-1/2
            flex
            h-8
            w-8
            -translate-y-1/2
            items-center
            justify-center

            rounded-full

            text-slate-400

            transition-all
            duration-200

            hover:bg-slate-200
            hover:text-slate-700

            active:scale-95

            focus:outline-none
            focus:ring-2
            focus:ring-blue-500/20
          "
        >
          <X
            size={15}
            strokeWidth={2}
          />
        </button>
      )}
    </div>
  );
}