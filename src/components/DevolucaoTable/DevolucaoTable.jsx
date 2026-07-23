import { MoreVertical, Laptop2 } from 'lucide-react';

export function DevolucaoTable({ devolucoes = [] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Professor
              </th>

              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Notebook
              </th>

              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Empréstimo
              </th>

              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Devolução
              </th>

              <th className="px-6 py-4 text-center font-semibold text-slate-600">
                Status
              </th>

              <th className="px-6 py-4 text-right font-semibold text-slate-600">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {devolucoes.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  Nenhuma devolução encontrada.
                </td>
              </tr>
            ) : (
              devolucoes.map((devolucao, index) => (
                <tr
                  key={devolucao.id}
                  className={`transition-colors hover:bg-slate-50 ${
                    index !== devolucoes.length - 1
                      ? 'border-b border-slate-100'
                      : ''
                  }`}
                >
                  {/* Professor */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                        {(devolucao.aluno || '?')
                          .substring(0, 2)
                          .toUpperCase()}
                      </div>

                      <div>
                        <p className="font-medium text-slate-800">
                          {devolucao.aluno}
                        </p>

                        <p className="text-xs text-slate-500">
                          Responsável pelo empréstimo
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Notebook */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Laptop2
                        size={18}
                        className="text-slate-400"
                      />

                      <div>
                        <p className="font-medium text-slate-800">
                          {devolucao.notebook}
                        </p>

                        <p className="text-xs text-slate-500">
                          Equipamento escolar
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Empréstimo */}
                  <td className="px-6 py-4 text-slate-600">
                    {devolucao.dataEmprestimo}
                  </td>

                  {/* Devolução */}
                  <td className="px-6 py-4 text-slate-600">
                    {devolucao.dataDevolucao}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Devolvido
                    </span>
                  </td>

                  {/* Ações */}
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      title="Mais opções"
                      className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
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
    </div>
  );
}