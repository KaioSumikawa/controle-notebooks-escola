import { SearchX } from 'lucide-react';

export function EmptySearch({
  title = 'Nenhum resultado encontrado',
  message = 'Não encontramos nenhum item com os filtros informados.',
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="p-4 rounded-full bg-gray-100 mb-4">
        <SearchX
          size={40}
          className="text-gray-400"
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-700">
        {title}
      </h3>

      <p className="mt-2 text-sm text-gray-500 max-w-md">
        {message}
      </p>
    </div>
  );
}