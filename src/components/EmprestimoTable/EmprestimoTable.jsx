import { MoreVertical } from 'lucide-react';

export function EmprestimoTable({ emprestimos = [] }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 card-shadow overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 font-semibold text-gray-700">
              Professor
            </th>

            <th className="px-6 py-3 font-semibold text-gray-700">
              Turma
            </th>

            <th className="px-6 py-3 font-semibold text-gray-700">
              Notebook
            </th>

            <th className="px-6 py-3 font-semibold text-gray-700">
              Data
            </th>

            <th className="px-6 py-3 font-semibold text-gray-700">
              Status
            </th>

            <th className="px-6 py-3 font-semibold text-gray-700 text-right">
              Ações
            </th>
          </tr>
        </thead>

        <tbody>
          {emprestimos.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="px-6 py-8 text-center text-gray-500"
              >
                Nenhum empréstimo encontrado.
              </td>
            </tr>
          ) : (
            emprestimos.map((emprestimo) => (
              <tr
                key={emprestimo.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  {emprestimo.professor}
                </td>

                <td className="px-6 py-4">
                  {emprestimo.turma}
                </td>

                <td className="px-6 py-4">
                  {emprestimo.notebookId}
                </td>

                <td className="px-6 py-4">
                  {emprestimo.dataEmprestimo || '-'}
                </td>

                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    Ativo
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    className="p-2 rounded hover:bg-gray-100"
                    title="Mais opções"
                  >
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}