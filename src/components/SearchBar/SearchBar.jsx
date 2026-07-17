import { Search, X } from 'lucide-react';

export function SearchBar({
  placeholder = 'Pesquisar...',
  value = '',
  onChange,
}) {
  return (
    <div className="relative w-full">

      {/* Ícone */}
      <Search
        size={18}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-400
          pointer-events-none
        "
      />

      {/* Campo */}
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="
          w-full
          h-12
          rounded-xl
          border
          border-slate-200
          bg-slate-50
          pl-11
          pr-11
          text-sm
          text-slate-700
          placeholder:text-slate-400
          outline-none
          transition-all
          duration-200

          focus:border-blue-500
          focus:bg-white
          focus:ring-4
          focus:ring-blue-100
        "
      />

      {/* Limpar */}
      {value && (
        <button
          type="button"
          onClick={() =>
            onChange?.({
              target: {
                value: '',
              },
            })
          }
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2

            flex
            h-7
            w-7
            items-center
            justify-center

            rounded-full
            text-slate-400

            transition

            hover:bg-slate-200
            hover:text-slate-700
          "
          aria-label="Limpar pesquisa"
        >
          <X size={15} />
        </button>
      )}

    </div>
  );
}