import {
  Plus,
  RotateCcw,
  QrCode,
  FileText,
} from 'lucide-react';

export function EmprestimoQuickActions({
  onNovoEmprestimo,
  onRegistrarDevolucao,
  onAbrirQRCode,
  onVerHistorico,
}) {
  const actions = [
    {
      label: 'Novo Empréstimo',
      description: 'Registrar retirada',
      icon: Plus,
      onClick: onNovoEmprestimo,
      iconWrapper: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Registrar Devolução',
      description: 'Devolver notebook',
      icon: RotateCcw,
      onClick: onRegistrarDevolucao,
      iconWrapper: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
    {
      label: 'Ler QR Code',
      description: 'Escanear notebook',
      icon: QrCode,
      onClick: onAbrirQRCode,
      iconWrapper: 'bg-violet-50',
      iconColor: 'text-violet-600',
    },
    {
      label: 'Ver Histórico',
      description: 'Últimos registros',
      icon: FileText,
      onClick: onVerHistorico,
      iconWrapper: 'bg-slate-100',
      iconColor: 'text-slate-700',
    },
  ];

  return (
    <section
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              type="button"
              onClick={action.onClick}
              className="
                group
                flex
                items-center
                gap-4
                border-t
                border-slate-200
                px-6
                py-4
                text-left
                transition-colors
                duration-200
                hover:bg-slate-50
                focus:outline-none
                focus:ring-2
                focus:ring-inset
                focus:ring-blue-500
                md:border-l
                md:border-t-0
                first:border-l-0
                md:first:border-l-0
              "
            >
              {/* Ícone */}
              <span
                className={`
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  ${action.iconWrapper}
                  transition-transform
                  duration-200
                  group-hover:scale-105
                `}
              >
                <Icon
                  size={24}
                  strokeWidth={2}
                  className={action.iconColor}
                />
              </span>

              {/* Texto */}
              <span className="min-w-0">
                <span className="block whitespace-nowrap text-sm font-semibold text-slate-800">
                  {action.label}
                </span>

                <span className="mt-1 block whitespace-nowrap text-xs text-slate-400">
                  {action.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}