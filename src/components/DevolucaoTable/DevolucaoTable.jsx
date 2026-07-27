import {
  CheckCircle2,
  Laptop2,
  MoreVertical,
} from 'lucide-react';

export function DevolucaoTable({
  devolucoes = [],
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 bg-white px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Histórico de Devoluções
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Consulte todas as devoluções registradas no sistema.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">

          <thead className="sticky top-0 border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Professor
              </th>

              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Notebook
              </th>

              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Turma
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
                  colSpan={7}
                  className="px-6 py-16 text-center text-slate-500"
                >
                  Nenhuma devolução encontrada.
                </td>
              </tr>
            ) : (
              devolucoes.map((devolucao, index) => (
                <tr
                  key={devolucao.id}
                  className={`transition-all duration-200 hover:bg-slate-50 ${
                    index !== devolucoes.length - 1
                      ? 'border-b border-slate-100'
                      : ''
                  }`}
                >
                  {/* Professor */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                        {devolucao.professor
                          ?.split(' ')
                          .map((nome) => nome[0])
                          .slice(0, 2)
                          .join('')
                          .toUpperCase()}
                      </div>

                      <div>
                        <p className="font-medium text-slate-800">
                          {devolucao.professor}
                        </p>

                        <p className="text-xs text-slate-500">
                          Professor responsável
                        </p>
                      </div>

                    </div>
                  </td>

                  {/* Notebook */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">

                      <Laptop2
                        size={18}
                        className="text-slate-400"
                      />

                      <span className="font-medium text-slate-700">
                        {devolucao.notebookId}
                      </span>

                    </div>
                  </td>

                  {/* Turma */}
                  <td className="px-6 py-5 text-slate-600">
                    {devolucao.turma}
                  </td>

                  {/* Empréstimo */}
                  <td className="px-6 py-5 text-slate-600">
                    {devolucao.dataEmprestimo}
                  </td>

                  {/* Devolução */}
                  <td className="px-6 py-5 text-slate-600">
                    {devolucao.dataDevolucao || '-'}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5 text-center">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      <CheckCircle2 size={13} />
                      Devolvido
                    </span>
                  </td>

                  {/* Ações */}
                  <td className="px-6 py-5 text-right">
                    <button
                      type="button"
                      title="Mais opções"
                      className="rounded-xl p-2 text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700"
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