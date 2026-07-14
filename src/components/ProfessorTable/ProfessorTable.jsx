import { Pencil } from 'lucide-react';

export function ProfessorTable({
  professores = [],
  onEdit,
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 card-shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-700">
                Nome
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Matrícula
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                E-mail
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Telefone
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Disciplina
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700 text-center">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {professores.map((professor) => (
              <tr
                key={professor.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {professor.nome}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {professor.matricula || '-'}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {professor.email || '-'}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {professor.telefone || '-'}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {professor.disciplina || '-'}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => onEdit?.(professor)}
                      className="flex items-center gap-2 px-3 py-2 text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                      title="Editar professor"
                    >
                      <Pencil size={16} />
                      Editar
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {professores.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  Nenhum professor encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}