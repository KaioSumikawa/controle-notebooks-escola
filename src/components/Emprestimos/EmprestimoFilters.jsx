import {
  Filter,
  ChevronDown,
  X,
} from 'lucide-react';

export function EmprestimoFilters({
  status = 'todos',
  onStatusChange,
  onClear,
}) {
  const hasActiveFilters = status !== 'todos';

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Filtro de status */}
      <div className="relative">
        <Filter
          size={16}
          strokeWidth={2}
          className="
            pointer-events-none
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <select
          value={status}
          onChange={(event) => {
            onStatusChange?.(event.target.value);
          }}
          aria-label="Filtrar empréstimos por status"
          className="
            h-10
            appearance-none
            rounded-xl
            border
            border-slate-200
            bg-white
            pl-9
            pr-10
            text-sm
            font-medium
            text-slate-700
            outline-none
            transition-all
            duration-200
            hover:border-slate-300
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-500/10
          "
        >
          <option value="todos">
            Todos os status
          </option>

          <option value="ativo">
            Em uso
          </option>

          <option value="devolvido">
            Devolvidos
          </option>
        </select>

        <ChevronDown
          size={16}
          strokeWidth={2}
          className="
            pointer-events-none
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />
      </div>

      {/* Limpar filtros */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClear}
          className="
            inline-flex
            h-10
            items-center
            gap-2
            rounded-xl
            px-3
            text-sm
            font-medium
            text-slate-500
            transition-all
            duration-200
            hover:bg-slate-100
            hover:text-slate-700
            focus:outline-none
            focus:ring-2
            focus:ring-slate-300
            focus:ring-offset-1
          "
        >
          <X
            size={16}
            strokeWidth={2}
          />

          Limpar filtros
        </button>
      )}
    </div>
  );
}