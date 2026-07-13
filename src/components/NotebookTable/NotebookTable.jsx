import { MoreVertical } from 'lucide-react';
import { StatusBadge } from '../StatusBadge';

export function NotebookTable({ notebooks }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 card-shadow overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 font-semibold text-gray-700">Nº</th>
            <th className="px-6 py-4 font-semibold text-gray-700">Identificação</th>
            <th className="px-6 py-4 font-semibold text-gray-700">Modelo</th>
            <th className="px-6 py-4 font-semibold text-gray-700">Patrimônio</th>
            <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
            <th className="px-6 py-4 font-semibold text-gray-700">Observação</th>
            <th className="px-6 py-4 font-semibold text-gray-700 text-center">
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
                {String(notebook.numero).padStart(2, '0')}
              </td>

              <td className="px-6 py-4 font-medium text-gray-900">
                {notebook.id}
              </td>

              <td className="px-6 py-4 text-gray-700">
                {notebook.modelo}
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

              <td className="px-6 py-4 text-center">
                <button
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Opções"
                >
                  <MoreVertical size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}