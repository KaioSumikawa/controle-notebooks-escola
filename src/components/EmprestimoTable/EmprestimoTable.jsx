import {
  MoreVertical,
  Users,
  Laptop,
  CalendarDays,
  CircleCheck,
} from 'lucide-react';
import { SearchBar } from '../SearchBar';
import { EmprestimoFilters } from '../Emprestimos/EmprestimoFilters';

export function EmprestimoTable({
  emprestimos = [],
  searchValue,
  onSearchChange,
  status,
  onStatusChange,
  period,
  onPeriodChange,
  total = emprestimos.length,
  inicio = total > 0 ? 1 : 0,
  fim = emprestimos.length,
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

  // Função auxiliar para gerar as iniciais do professor de forma segura
  const obterIniciais = (nome) => {
    if (!nome || nome === '-') return '-';
    const partes = nome.trim().split(' ').filter(Boolean);
    if (partes.length === 0) return '-';
    if (partes.length === 1) return partes[0].substring(0, 2).toUpperCase();
    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
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
      {/* Toolbar superior com pesquisa e filtros ajustados para ocupar mais espaço */}
      <div className="flex flex-col gap-4 border-b border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:w-3/5">
          <SearchBar
            placeholder="Pesquisar por professor, turma ou notebook..."
            value={searchValue}
            onChange={onSearchChange}
          />
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:justify-end">
          <EmprestimoFilters
            status={status}
            onStatusChange={onStatusChange}
            period={period}
            onPeriodChange={onPeriodChange}
          />
        </div>
      </div>

      {/* Tabela com scroll adaptável e cabeçalho sticky com sombra */}
      <div className="max-h-[calc(100vh-320px)] overflow-auto overflow-x-auto">
        <table className="w-full min-w-[1050px] text-left text-sm">
          <thead className="sticky top-0 z-10 border-b border-slate-200 bg-white shadow-sm">
            <tr>
              <th
                className="
                  px-5
                  py-3.5
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
                  px-5
                  py-3.5
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
                  px-5
                  py-3.5
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
                  px-5
                  py-3.5
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
                  px-5
                  py-3.5
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
                  px-5
                  py-3.5
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
                  px-5
                  py-3.5
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
                    py-16
                    text-center
                  "
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        Nenhum empréstimo encontrado.
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Tente ajustar os filtros ou realizar uma nova busca.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              emprestimos.map((emprestimo) => {
                const statusAtivo = emprestimo.status === 'ativo';

                return (
                  <tr
                    key={emprestimo.id}
                    className="
                      group
                      transition-colors
                      duration-200
                      hover:bg-slate-50/70
                    "
                  >
                    {/* Professor com Avatar em Gradiente */}
                    <td className="px-5 py-4">
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
                            bg-gradient-to-br
                            from-blue-500
                            to-blue-600
                            text-xs
                            font-bold
                            text-white
                            shadow-sm
                          "
                        >
                          {obterIniciais(emprestimo.professor)}
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
                    <td className="px-5 py-4">
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
                    <td className="px-5 py-4">
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
                    <td className="px-5 py-4">
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
                            {formatarData(emprestimo.dataEmprestimo)}
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
                    <td className="px-5 py-4">
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
                            {formatarData(emprestimo.dataDevolucaoPrevista)}
                          </p>

                          {emprestimo.horaDevolucaoPrevista && (
                            <p
                              className="
                                mt-0.5
                                text-xs
                                text-slate-500
                              "
                            >
                              {emprestimo.horaDevolucaoPrevista}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Status badges refinadas com select-none e py-1.5 */}
                    <td className="px-5 py-4">
                      {statusAtivo ? (
                        <span
                          className="
                            inline-flex
                            select-none
                            items-center
                            gap-1.5
                            whitespace-nowrap
                            rounded-full
                            bg-emerald-50
                            px-3.5
                            py-1.5
                            text-sm
                            font-semibold
                            text-emerald-700
                          "
                        >
                          <CircleCheck size={16} strokeWidth={2} />
                          Em uso
                        </span>
                      ) : (
                        <span
                          className="
                            inline-flex
                            select-none
                            items-center
                            gap-1.5
                            whitespace-nowrap
                            rounded-full
                            bg-slate-100
                            px-3.5
                            py-1.5
                            text-sm
                            font-semibold
                            text-slate-600
                          "
                        >
                          <CircleCheck size={16} strokeWidth={2} />
                          Devolvido
                        </span>
                      )}
                    </td>

                    {/* Ações com botão otimizado */}
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        className="
                          inline-flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-lg
                          text-slate-400
                          transition-colors
                          duration-200
                          hover:bg-slate-100
                          hover:text-slate-700
                          focus:outline-none
                          focus:ring-2
                          focus:ring-blue-500
                          focus:ring-offset-2
                        "
                        title="Mais opções"
                        aria-label={`Mais opções para o empréstimo de ${
                          emprestimo.professor || 'professor'
                        }`}
                      >
                        <MoreVertical size={18} strokeWidth={2} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Rodapé com fundo totalmente branco e paginação dinâmica */}
      <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 bg-white px-6 py-3.5 sm:flex-row">
        <p className="text-xs text-slate-500">
          Mostrando <span className="font-semibold text-slate-700">{inicio}-{fim}</span> de <span className="font-semibold text-slate-700">{total}</span> registros
        </p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-400 shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            &lt;
          </button>
          <button
            type="button"
            className="rounded-lg border border-blue-500 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 shadow-sm"
          >
            1
          </button>
          <button
            type="button"
            disabled
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-400 shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
}