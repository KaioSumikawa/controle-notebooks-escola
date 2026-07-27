import {
  CalendarDays,
  Filter,
  X,
} from 'lucide-react';

export function DevolucaoFilters({
  status = 'todos',
  period = 'todos',
  onStatusChange,
  onPeriodChange,
  onClear,
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      <div className="flex flex-1 flex-col gap-4 sm:flex-row">

        {/* Status */}
        <div className="relative w-full sm:w-56">

          <Filter
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={status}
            onChange={(e) =>
              onStatusChange?.(e.target.value)
            }
            className="
              h-12
              w-full
              appearance-none
              rounded-2xl
              border
              border-slate-200
              bg-white
              pl-11
              pr-10
              text-sm
              font-medium
              text-slate-700
              shadow-sm
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
              Todos os Status
            </option>

            <option value="ativo">
              Pendentes
            </option>

            <option value="finalizado">
              Devolvidos
            </option>
          </select>

        </div>

        {/* Período */}
        <div className="relative w-full sm:w-56">

          <CalendarDays
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={period}
            onChange={(e) =>
              onPeriodChange?.(e.target.value)
            }
            className="
              h-12
              w-full
              appearance-none
              rounded-2xl
              border
              border-slate-200
              bg-white
              pl-11
              pr-10
              text-sm
              font-medium
              text-slate-700
              shadow-sm
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
              Todo o período
            </option>

            <option value="hoje">
              Hoje
            </option>

            <option value="7dias">
              Últimos 7 dias
            </option>

            <option value="30dias">
              Últimos 30 dias
            </option>

            <option value="90dias">
              Últimos 90 dias
            </option>
          </select>

        </div>

      </div>

      {/* Limpar filtros */}
      <button
        type="button"
        onClick={onClear}
        className="
          inline-flex
          h-12
          items-center
          justify-center
          gap-2
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-5
          text-sm
          font-medium
          text-slate-600
          shadow-sm
          transition-all
          duration-200
          hover:border-red-200
          hover:bg-red-50
          hover:text-red-600
        "
      >
        <X size={16} />
        Limpar filtros
      </button>

    </div>
  );
}