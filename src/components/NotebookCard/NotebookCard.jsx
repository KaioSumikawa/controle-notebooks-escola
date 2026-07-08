import { Laptop, Clock, User } from 'lucide-react';
import { StatusBadge } from '../StatusBadge';

export function NotebookCard({ 
  id = '1',
  model = 'Notebook',
  status = 'Disponível',
  lastUser,
  borrowDate,
  onClick 
}) {
  return (
    <div 
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-4 card-shadow hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Laptop size={24} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">{model}</p>
            <p className="text-sm text-gray-500">ID: {id}</p>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="space-y-2 text-sm">
        {lastUser && (
          <div className="flex items-center gap-2 text-gray-600">
            <User size={16} />
            <span>{lastUser}</span>
          </div>
        )}
        {borrowDate && (
          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={16} />
            <span>{borrowDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}
