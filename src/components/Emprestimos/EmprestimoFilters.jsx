import {
  Filter,
  CalendarDays,
  ChevronDown,
} from 'lucide-react';

export function EmprestimoFilters({
  status = 'todos',
  period = '30dias',
  onStatusChange,
  onPeriodChange,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Status */}
      <div className="relative">
        <Filter
          size={18}
          strokeWidth={2}
          className="
            pointer-events-none
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <select
          value={status}
          onChange={(event) =>
            onStatusChange?.(event.target.value)
          }
          aria-label="Filtrar por status"
          className="
            h-12
            min-w-[190px]
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
            hover:shadow
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-500/10
          "
        >
          <option value="todos">
            Status: Todos
          </option>

          <option value="ativo">
            Status: Em uso
          </option>

          <option value="devolvido">
            Status: Devolvidos
          </option>
        </select>

        <ChevronDown
          size={16}
          strokeWidth={2}
          className="
            pointer-events-none
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />
      </div>

      {/* Período */}
      <div className="relative">
        <CalendarDays
          size={18}
          strokeWidth={2}
          className="
            pointer-events-none
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <select
          value={period}
          onChange={(event) =>
            onPeriodChange?.(event.target.value)
          }
          aria-label="Filtrar por período"
          className="
            h-12
            min-w-[220px]
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
            hover:shadow
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-500/10
          "
        >
          <option value="hoje">
            Período: Hoje
          </option>

          <option value="7dias">
            Período: Últimos 7 dias
          </option>

          <option value="30dias">
            Período: Últimos 30 dias
          </option>

          <option value="mes">
            Período: Este mês
          </option>

          <option value="todos">
            Período: Todo o período
          </option>
        </select>

        <ChevronDown
          size={16}
          strokeWidth={2}
          className="
            pointer-events-none
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />
      </div>
    </div>
  );
}