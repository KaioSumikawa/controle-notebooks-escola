import {
  ClipboardList,
  Activity,
  Clock3,
  CheckCircle2,
} from 'lucide-react';

export function EmprestimoStats({
  total = 0,
  ativos = 0,
  hoje = 0,
  devolvidos = 0,
}) {
  const stats = [
    {
      label: 'Total de empréstimos',
      value: total,
      description: 'Todos os registros',
      icon: ClipboardList,
      iconWrapper: 'bg-blue-50',
      iconColor: 'text-blue-600',
      valueColor: 'text-blue-600',
    },
    {
      label: 'Em uso agora',
      value: ativos,
      description: 'Notebooks emprestados',
      icon: Activity,
      iconWrapper: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      valueColor: 'text-emerald-600',
    },
    {
      label: 'Registrados hoje',
      value: hoje,
      description: 'Novos empréstimos',
      icon: Clock3,
      iconWrapper: 'bg-amber-50',
      iconColor: 'text-amber-600',
      valueColor: 'text-amber-600',
    },
    {
      label: 'Devolvidos hoje',
      value: devolvidos,
      description: 'Empréstimos finalizados',
      icon: CheckCircle2,
      iconWrapper: 'bg-violet-50',
      iconColor: 'text-violet-600',
      valueColor: 'text-violet-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="
              group
              flex
              min-h-[126px]
              items-center
              gap-5
              rounded-xl
              border
              border-slate-200
              bg-white
              px-5
              py-4
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:shadow-md
            "
          >
            {/* Ícone */}
            <div
              className={`
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-2xl
                ${stat.iconWrapper}
                transition-transform
                duration-200
                group-hover:scale-105
              `}
            >
              <Icon
                size={27}
                strokeWidth={2}
                className={stat.iconColor}
              />
            </div>

            {/* Conteúdo */}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-500">
                {stat.label}
              </p>

              <p
                className={`
                  mt-1
                  text-3xl
                  font-bold
                  leading-none
                  tracking-tight
                  ${stat.valueColor}
                `}
              >
                {stat.value}
              </p>

              <p className="mt-3 text-xs text-slate-400">
                {stat.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}