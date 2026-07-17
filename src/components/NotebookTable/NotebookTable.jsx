import { Pencil, Trash2 } from 'lucide-react';
import { StatusBadge } from '../StatusBadge';

export function NotebookTable({
  notebooks = [],
  onEdit,
  onDelete,
}) {
  if (notebooks.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 card-shadow p-8 text-center">
        <p className="text-gray-500">
          Nenhum notebook encontrado.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 card-shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">
                Nº
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">
                Identificação
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">
                Modelo
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">
                Patrimônio
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">
                Status
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Observação
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700 text-center whitespace-nowrap">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {notebooks.map((notebook) => (
              <tr
                key={notebook.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {notebook.numero != null
                    ? String(notebook.numero).padStart(2, '0')
                    : '-'}
                </td>

                <td className="px-6 py-4 font-medium text-gray-900">
                  {notebook.id || '-'}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {notebook.modelo || '-'}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {notebook.patrimonio || '-'}
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={notebook.status} />
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {notebook.observacao || '-'}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit?.(notebook)}
                      disabled={!onEdit}
                      className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Editar notebook"
                    >
                      <Pencil size={16} />
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete?.(notebook)}
                      disabled={!onDelete}
                      className="flex items-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Excluir notebook"
                    >
                      <Trash2 size={16} />
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}