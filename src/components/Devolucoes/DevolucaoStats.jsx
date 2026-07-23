import {
  ClipboardList,
  RotateCcw,
  CheckCircle2,
  CalendarDays,
} from 'lucide-react';

export default function DevolucaoStats({
  total = 0,
  pendentes = 0,
  concluidasHoje = 0,
}) {
  const hoje = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const cards = [
    {
      title: 'Total de Devoluções',
      value: total,
      icon: ClipboardList,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Pendentes',
      value: pendentes,
      icon: RotateCcw,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    {
      title: 'Concluídas Hoje',
      value: concluidasHoje,
      icon: CheckCircle2,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
    {
      title: 'Data',
      value: hoje,
      icon: CalendarDays,
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-1
              hover:shadow-md
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h3 className="mt-2 text-3xl font-bold text-slate-800">
                  {card.value}
                </h3>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.iconBg}`}
              >
                <Icon
                  size={22}
                  className={card.iconColor}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}