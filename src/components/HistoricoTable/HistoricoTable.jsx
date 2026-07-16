import {
  Clock,
  Laptop,
  User,
  Undo2,
} from 'lucide-react';
import { StatusBadge } from '../StatusBadge';

export function HistoricoTable({
  historico = [],
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 card-shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-700">
                Data
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Notebook
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Professor
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Turma
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Tipo
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Status
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Observação
              </th>
            </tr>
          </thead>

          <tbody>
            {historico.length > 0 ? (
              historico.map((item) => {
                const devolvido =
                  item.status === 'finalizado';

                const data = devolvido
                  ? item.dataDevolucao
                  : item.dataEmprestimo;

                const hora = devolvido
                  ? item.horaDevolucao
                  : item.horaEmprestimo;

                return (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    {/* Data */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock size={16} />

                        <div>
                          <p className="font-medium">
                            {data || '-'}
                          </p>

                          <p className="text-xs text-gray-500">
                            {hora || '-'}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Notebook */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Laptop
                          size={16}
                          className="text-gray-500"
                        />

                        <span className="font-medium text-gray-900">
                          {item.notebookId}
                        </span>
                      </div>
                    </td>

                    {/* Professor */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User
                          size={16}
                          className="text-gray-500"
                        />

                        <span className="text-gray-700">
                          {item.professor}
                        </span>
                      </div>
                    </td>

                    {/* Turma */}
                    <td className="px-6 py-4 text-gray-700">
                      {item.turma || '-'}
                    </td>

                    {/* Tipo */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {devolvido ? (
                          <>
                            <Undo2
                              size={16}
                              className="text-green-600"
                            />

                            <span className="font-medium text-green-700">
                              Devolução
                            </span>
                          </>
                        ) : (
                          <>
                            <Laptop
                              size={16}
                              className="text-blue-600"
                            />

                            <span className="font-medium text-blue-700">
                              Empréstimo
                            </span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <StatusBadge
                        status={item.status}
                      />
                    </td>

                    {/* Observação */}
                    <td className="px-6 py-4 text-gray-600">
                      {item.observacao || '-'}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  Nenhum registro encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}