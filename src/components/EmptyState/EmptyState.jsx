import { Inbox } from 'lucide-react';

export function EmptyState({
  title = 'Nenhum resultado encontrado',
  description = 'Tente ajustar sua pesquisa ou os filtros para encontrar o que procura.',
  icon: Icon = Inbox,
}) {
  return (
    <div className="flex min-h-[420px] items-center justify-center">
      <div
        className="
          flex
          w-full
          max-w-xl
          flex-col
          items-center
          rounded-3xl
          border
          border-slate-200
          bg-white
          px-10
          py-14
          text-center
          shadow-sm
        "
      >
        {/* Ícone */}
        <div
          className="
            mb-6
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            bg-slate-100
            text-slate-400
          "
        >
          <Icon
            size={40}
            strokeWidth={1.8}
          />
        </div>

        {/* Título */}
        <h3 className="text-2xl font-semibold tracking-tight text-slate-800">
          {title}
        </h3>

        {/* Descrição */}
        <p className="mt-3 max-w-md text-[15px] leading-7 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}