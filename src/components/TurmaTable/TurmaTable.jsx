import { Edit2, Trash2 } from 'lucide-react';

export function TurmaTable({
  turmas = [],
  isLoading = false,
  onEdit,
  onDelete,
}) {
  if (turmas.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 card-shadow p-8 text-center">
        <p className="text-gray-500">
          Nenhuma turma encontrada.
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
              <th className="px-6 py-4 font-semibold text-gray-700">
                Nome da Turma
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Criada em
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700 text-center">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {turmas.map((turma) => {
              const dataCriacao =
                turma.created_at || turma.createdAt;

              return (
                <tr
                  key={turma.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {turma.nome || '-'}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {dataCriacao
                      ? new Date(dataCriacao).toLocaleDateString('pt-BR')
                      : '-'}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit?.(turma)}
                        disabled={isLoading || !onEdit}
                        title="Editar turma"
                        className="flex items-center gap-2 px-3 py-2 text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Edit2 size={14} />
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete?.(turma)}
                        disabled={isLoading || !onDelete}
                        title="Excluir turma"
                        className="flex items-center gap-2 px-3 py-2 text-red-700 bg-red-100 hover:bg-red-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash2 size={14} />
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}