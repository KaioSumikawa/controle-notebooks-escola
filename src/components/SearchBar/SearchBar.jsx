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
      {/* Ícone de pesquisa */}
      <Search
        size={19}
        strokeWidth={1.8}
        className="
          pointer-events-none
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-400
        "
      />

      {/* Campo de pesquisa */}
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        aria-label="Pesquisar"
        className="
          h-11
          w-full
          rounded-xl
          border
          border-slate-200
          bg-white
          pl-11
          pr-11
          text-sm
          text-slate-700
          outline-none
          transition-all
          duration-200

          placeholder:text-slate-400

          hover:border-slate-300

          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-500/10
        "
      />

      {/* Limpar pesquisa */}
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
            h-7
            w-7
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            text-slate-400
            transition-all
            duration-200
            hover:bg-slate-100
            hover:text-slate-700
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