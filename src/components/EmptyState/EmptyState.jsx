import { Inbox } from 'lucide-react';

export function EmptyState({ 
  title = 'Nenhum resultado encontrado', 
  description = 'Tente ajustar seus filtros ou pesquisa',
  icon: Icon = Inbox 
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 py-12">
      <div className="mb-4 text-gray-300">
        <Icon size={64} strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-semibold text-gray-600 mb-2">{title}</h3>
      <p className="text-gray-400 text-center max-w-sm">{description}</p>
    </div>
  );
}
