import {
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';

const variants = {
  primary: {
    line: 'bg-blue-600',
    iconBg: 'from-blue-500 to-blue-600',
  },

  success: {
    line: 'bg-emerald-600',
    iconBg: 'from-emerald-500 to-emerald-600',
  },

  warning: {
    line: 'bg-amber-500',
    iconBg: 'from-amber-400 to-amber-500',
  },

  danger: {
    line: 'bg-red-600',
    iconBg: 'from-red-500 to-red-600',
  },

  default: {
    line: 'bg-slate-500',
    iconBg: 'from-slate-500 to-slate-600',
  },
};

export function DashboardCard({
  title,
  value,
  icon: Icon,
  variant = 'primary',
  description,
  onClick,
}) {
  const style = variants[variant] || variants.default;

  const handleKeyDown = (event) => {
    if (!onClick) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300

        ${
          onClick
            ? `
              cursor-pointer
              hover:-translate-y-1
              hover:shadow-xl
              hover:border-slate-300
            `
            : ''
        }
      `}
    >
      {/* Barra superior */}
      <div className={`h-1.5 w-full ${style.line}`} />

      <div className="p-6">

        <div className="flex items-start justify-between">

          <div>

            <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
              {title}
            </p>

            <h2 className="mt-3 text-5xl font-bold tracking-tight text-slate-900">
              {value}
            </h2>

          </div>

          {Icon && (
            <div
              className={`
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                ${style.iconBg}
                shadow-lg
              `}
            >
              <Icon
                size={28}
                className="text-white"
                strokeWidth={2}
              />
            </div>
          )}

        </div>

        {description && (
          <p className="mt-5 text-sm leading-relaxed text-slate-500">
            {description}
          </p>
        )}

        {onClick && (
          <div className="mt-6 flex items-center justify-between">

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              Clique para visualizar
            </span>

            <div className="flex items-center gap-1 text-blue-600 transition-transform duration-300 group-hover:translate-x-1">

              <ArrowUpRight size={16} />

              <ChevronRight size={18} />

            </div>

          </div>
        )}

      </div>
    </div>
  );
}