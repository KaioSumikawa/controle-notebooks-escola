import {
  MoreVertical,
  UserRound,
  Users,
  Laptop,
  CalendarDays,
  CircleCheck,
} from 'lucide-react';

export function EmprestimoTable({
  emprestimos = [],
}) {
  const formatarData = (data) => {
    if (!data) {
      return '-';
    }

    const dataObj = new Date(`${data}T00:00:00`);

    if (Number.isNaN(dataObj.getTime())) {
      return data;
    }

    return dataObj.toLocaleDateString('pt-BR');
  };

  return (
    <section
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50/70">
            <tr>
              <th
                className="
                  px-6
                  py-4
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
                Professor
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
                Turma
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
                Notebook
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
                Data do empréstimo
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
                Previsão de devolução
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
                Status
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-right
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
                Ações
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {emprestimos.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="
                    px-6
                    py-14
                    text-center
                    text-sm
                    text-slate-500
                  "
                >
                  Nenhum empréstimo encontrado.
                </td>
              </tr>
            ) : (
              emprestimos.map((emprestimo) => {
                const statusAtivo =
                  emprestimo.status === 'ativo';

                return (
                  <tr
                    key={emprestimo.id}
                    className="
                      group
                      transition-colors
                      duration-150
                      hover:bg-slate-50/70
                    "
                  >
                    {/* Professor */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-blue-50
                          "
                        >
                          <UserRound
                            size={18}
                            strokeWidth={1.8}
                            className="text-blue-600"
                          />
                        </div>

                        <div className="min-w-0">
                          <p
                            className="
                              truncate
                              font-semibold
                              text-slate-900
                            "
                          >
                            {emprestimo.professor || '-'}
                          </p>

                          <p
                            className="
                              mt-0.5
                              truncate
                              text-xs
                              text-slate-500
                            "
                          >
                            Professor responsável
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Turma */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2.5">
                        <Users
                          size={17}
                          strokeWidth={1.8}
                          className="text-slate-400"
                        />

                        <span
                          className="
                            whitespace-nowrap
                            font-medium
                            text-slate-700
                          "
                        >
                          {emprestimo.turma || '-'}
                        </span>
                      </div>
                    </td>

                    {/* Notebook */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2.5">
                        <Laptop
                          size={18}
                          strokeWidth={1.8}
                          className="text-slate-400"
                        />

                        <div>
                          <p
                            className="
                              whitespace-nowrap
                              font-semibold
                              text-slate-800
                            "
                          >
                            {emprestimo.notebookId || '-'}
                          </p>

                          {emprestimo.modelo && (
                            <p
                              className="
                                mt-0.5
                                whitespace-nowrap
                                text-xs
                                text-slate-500
                              "
                            >
                              {emprestimo.modelo}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Data do empréstimo */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2.5">
                        <CalendarDays
                          size={17}
                          strokeWidth={1.8}
                          className="text-slate-400"
                        />

                        <div>
                          <p
                            className="
                              whitespace-nowrap
                              font-medium
                              text-slate-700
                            "
                          >
                            {formatarData(
                              emprestimo.dataEmprestimo
                            )}
                          </p>

                          {emprestimo.horaEmprestimo && (
                            <p
                              className="
                                mt-0.5
                                text-xs
                                text-slate-500
                              "
                            >
                              {emprestimo.horaEmprestimo}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Previsão de devolução */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2.5">
                        <CalendarDays
                          size={17}
                          strokeWidth={1.8}
                          className="text-slate-400"
                        />

                        <div>
                          <p
                            className="
                              whitespace-nowrap
                              font-medium
                              text-slate-700
                            "
                          >
                            {formatarData(
                              emprestimo.dataDevolucaoPrevista
                            )}
                          </p>

                          {emprestimo.horaDevolucaoPrevista && (
                            <p
                              className="
                                mt-0.5
                                text-xs
                                text-slate-500
                              "
                            >
                              {
                                emprestimo.horaDevolucaoPrevista
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      {statusAtivo ? (
                        <span
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            whitespace-nowrap
                            rounded-full
                            bg-emerald-50
                            px-3
                            py-1.5
                            text-xs
                            font-semibold
                            text-emerald-700
                          "
                        >
                          <CircleCheck
                            size={14}
                            strokeWidth={2}
                          />

                          Em uso
                        </span>
                      ) : (
                        <span
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            whitespace-nowrap
                            rounded-full
                            bg-slate-100
                            px-3
                            py-1.5
                            text-xs
                            font-semibold
                            text-slate-600
                          "
                        >
                          <CircleCheck
                            size={14}
                            strokeWidth={2}
                          />

                          Devolvido
                        </span>
                      )}
                    </td>

                    {/* Ações */}
                    <td className="px-6 py-5 text-right">
                      <button
                        type="button"
                        className="
                          inline-flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-lg
                          text-slate-400
                          transition-colors
                          duration-150
                          hover:bg-slate-100
                          hover:text-slate-700
                          focus:outline-none
                          focus:ring-2
                          focus:ring-blue-500
                          focus:ring-offset-2
                        "
                        title="Mais opções"
                        aria-label={`
                          Mais opções para o empréstimo de
                          ${emprestimo.professor || 'professor'}
                        `}
                      >
                        <MoreVertical
                          size={18}
                          strokeWidth={2}
                        />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}