import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Laptop,
  CheckCircle2,
  ClipboardList,
  Wrench,
  Bell,
  ShieldCheck,
  CalendarDays,
  Clock3,
  ArrowRight,
  BarChart3,
} from 'lucide-react';

import { Layout, DashboardCard } from '../../components';
import { useNotebooks } from '../../hooks/useNotebooks';
import { useEmprestimos } from '../../hooks/useEmprestimos';

export function Dashboard() {
  const navigate = useNavigate();

  const { notebooks = [] } = useNotebooks();
  const { emprestimos = [] } = useEmprestimos();

  const totalNotebooks = notebooks.length;

  const notebooksDisponiveis = useMemo(
    () =>
      notebooks.filter(
        (notebook) => notebook.status === 'disponivel'
      ).length,
    [notebooks]
  );

  const notebooksManutencao = useMemo(
    () =>
      notebooks.filter(
        (notebook) => notebook.status === 'manutencao'
      ).length,
    [notebooks]
  );

  const emprestimosAtivos = useMemo(
    () =>
      emprestimos.filter(
        (emprestimo) => emprestimo.status === 'ativo'
      ),
    [emprestimos]
  );

  const ultimosEmprestimos = useMemo(() => {
    return [...emprestimosAtivos]
      .sort((a, b) => {
        const dataA = new Date(
          `${a.dataEmprestimo}T${a.horaEmprestimo || '00:00'}`
        );

        const dataB = new Date(
          `${b.dataEmprestimo}T${b.horaEmprestimo || '00:00'}`
        );

        return dataB - dataA;
      })
      .slice(0, 5);
  }, [emprestimosAtivos]);

  const formatarData = (data) => {
    if (!data) return '--/--/----';

    const [ano, mes, dia] = data.split('-');

    if (!ano || !mes || !dia) {
      return data;
    }

    return `${dia}/${mes}/${ano}`;
  };

  return (
    <Layout
      title="Dashboard"
      showSearch
      searchPlaceholder="Pesquisar notebooks..."
    >
      <div className="space-y-8">

        {/* Cards superiores */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

          <DashboardCard
            title="Total de Notebooks"
            value={totalNotebooks}
            icon={Laptop}
            variant="primary"
            description="Cadastrados no sistema"
            onClick={() =>
              navigate('/notebooks', {
                state: { filtro: 'todos' },
              })
            }
          />

          <DashboardCard
            title="Disponíveis"
            value={notebooksDisponiveis}
            icon={CheckCircle2}
            variant="success"
            description="Prontos para empréstimo"
            onClick={() =>
              navigate('/notebooks', {
                state: { filtro: 'disponivel' },
              })
            }
          />

          <DashboardCard
            title="Emprestados"
            value={emprestimosAtivos.length}
            icon={ClipboardList}
            variant="warning"
            description="Em uso pelos professores"
            onClick={() =>
              navigate('/notebooks', {
                state: { filtro: 'emprestado' },
              })
            }
          />

          <DashboardCard
            title="Em Manutenção"
            value={notebooksManutencao}
            icon={Wrench}
            variant="danger"
            description="Aguardando reparo"
            onClick={() =>
              navigate('/notebooks', {
                state: { filtro: 'manutencao' },
              })
            }
          />

        </div>

        {/* Conteúdo Principal */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Card: Últimos empréstimos */}
          <div className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm lg:col-span-2 flex flex-col justify-between">

            <div>
              {/* Cabeçalho */}
              <div className="mb-6 flex items-center justify-between">

                <h2 className="text-xl font-bold text-slate-900">
                  Últimos Empréstimos
                </h2>

                <button
                  type="button"
                  onClick={() => navigate('/emprestimos')}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-200
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-slate-800
                    transition
                    hover:bg-slate-50
                  "
                >
                  Ver todos

                  <ArrowRight
                    size={16}
                    className="text-blue-600"
                  />
                </button>

              </div>

              {/* Lista de Empréstimos */}
              {ultimosEmprestimos.length === 0 ? (

                <div className="flex items-center justify-center py-12">

                  <p className="text-slate-400 font-medium">
                    Nenhum empréstimo ativo.
                  </p>

                </div>

              ) : (

                <div className="divide-y divide-slate-100">

                  {ultimosEmprestimos.map((emprestimo) => (

                    <div
                      key={emprestimo.id}
                      className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between px-1"
                    >

                      {/* Lado esquerdo: Ícone + Info */}
                      <div className="flex items-center gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50">

                          <Laptop
                            size={20}
                            strokeWidth={2}
                            className="text-blue-600"
                          />

                        </div>

                        <div className="space-y-1">

                          <h3 className="text-base font-bold text-slate-900">
                            Notebook Nº {String(emprestimo.notebookId).padStart(3, '0')}
                          </h3>

                          <p className="text-sm font-normal text-slate-500">
                            {emprestimo.professor} • {emprestimo.turma}
                          </p>

                          <div>
                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600">
                              Em uso
                            </span>
                          </div>

                        </div>

                      </div>

                      {/* Lado direito: Data e Hora */}
                      <div className="flex flex-col gap-1.5 text-sm text-slate-400 md:items-end">

                        <div className="flex items-center gap-2">

                          <CalendarDays
                            size={16}
                            strokeWidth={1.8}
                            className="text-slate-400"
                          />

                          <span>
                            {formatarData(emprestimo.dataEmprestimo)}
                          </span>

                        </div>

                        <div className="flex items-center gap-2">

                          <Clock3
                            size={16}
                            strokeWidth={1.8}
                            className="text-slate-400"
                          />

                          <span>
                            {emprestimo.horaEmprestimo || '--:--'}
                          </span>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              )}
            </div>

            {/* CTA Inferior alinhado */}
            <div className="mt-6 rounded-2xl bg-slate-50/80 p-5">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3.5">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center">
                    <CalendarDays
                      size={28}
                      strokeWidth={2}
                      className="text-blue-600"
                    />
                  </div>

                  <div>

                    <h3 className="text-base font-semibold text-slate-900 leading-snug">
                      Acompanhe todos os empréstimos realizados.
                    </h3>

                    <p className="text-sm text-slate-400">
                      Mais controle e organização para a escola.
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => navigate('/emprestimos')}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-2.5
                    text-sm
                    font-medium
                    text-white
                    shadow-sm
                    transition
                    hover:bg-blue-700
                    whitespace-nowrap
                  "
                >
                  Ir para Empréstimos

                  <ArrowRight
                    size={18}
                    strokeWidth={2}
                  />

                </button>

              </div>

            </div>

          </div>

          {/* Painel lateral */}
          <div className="space-y-6">

            {/* Resumo Geral */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">

              <div className="mb-7 flex items-center gap-2.5">

                <BarChart3
                  size={20}
                  className="text-blue-600 shrink-0"
                />

                <h2 className="text-lg font-semibold text-slate-900">
                  Resumo Geral
                </h2>

              </div>

              <div className="space-y-0">

                <div className="flex items-center gap-4 border-b border-slate-100 py-3 first:pt-0 hover:bg-slate-50/60 rounded-lg transition-colors duration-200 px-2">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50">

                    <Laptop
                      size={18}
                      className="text-blue-600"
                    />

                  </div>

                  <span className="flex-1 text-sm text-slate-500">
                    Total de Notebooks
                  </span>

                  <span className="text-lg font-semibold text-blue-600">
                    {totalNotebooks}
                  </span>

                </div>

                <div className="flex items-center gap-4 border-b border-slate-100 py-3 hover:bg-slate-50/60 rounded-lg transition-colors duration-200 px-2">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50">

                    <CheckCircle2
                      size={18}
                      className="text-emerald-600"
                    />

                  </div>

                  <span className="flex-1 text-sm text-slate-500">
                    Disponíveis
                  </span>

                  <span className="text-lg font-semibold text-emerald-600">
                    {notebooksDisponiveis}
                  </span>

                </div>

                <div className="flex items-center gap-4 border-b border-slate-100 py-3 hover:bg-slate-50/60 rounded-lg transition-colors duration-200 px-2">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50">

                    <ClipboardList
                      size={18}
                      className="text-amber-600"
                    />

                  </div>

                  <span className="flex-1 text-sm text-slate-500">
                    Emprestados
                  </span>

                  <span className="text-lg font-semibold text-amber-600">
                    {emprestimosAtivos.length}
                  </span>

                </div>

                <div className="flex items-center gap-4 py-3 last:pb-0 hover:bg-slate-50/60 rounded-lg transition-colors duration-200 px-2">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50">

                    <Wrench
                      size={18}
                      className="text-red-600"
                    />

                  </div>

                  <span className="flex-1 text-sm text-slate-500">
                    Em Manutenção
                  </span>

                  <span className="text-lg font-semibold text-red-600">
                    {notebooksManutencao}
                  </span>

                </div>

              </div>

            </div>

            {/* Avisos */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

              <div className="mb-6 flex items-center gap-3">

                <Bell
                  size={22}
                  strokeWidth={2}
                  className="text-blue-600"
                />

                <h2 className="text-xl font-semibold text-slate-900">
                  Avisos
                </h2>

              </div>

              <div className="space-y-2">

                {/* Aviso de manutenção */}
                <div className="flex items-center gap-4 rounded-xl bg-emerald-50/70 px-4 py-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500">

                    <CheckCircle2
                      size={19}
                      strokeWidth={2.5}
                      className="text-white"
                    />

                  </div>

                  <p className="text-sm font-medium text-slate-700">

                    {notebooksManutencao === 0
                      ? 'Nenhum notebook em manutenção.'
                      : `${notebooksManutencao} notebook(s) em manutenção.`}

                  </p>

                </div>

                {/* Aviso de empréstimos */}
                <div className="flex items-center gap-4 rounded-xl bg-blue-50/70 px-4 py-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50">

                    <ClipboardList
                      size={19}
                      strokeWidth={2}
                      className="text-blue-600"
                    />

                  </div>

                  <p className="text-sm font-medium text-slate-700">

                    {emprestimosAtivos.length}{' '}
                    empréstimo(s) ativo(s) no momento.

                  </p>

                </div>

                {/* Status do sistema */}
                <div className="flex items-center gap-4 rounded-xl bg-emerald-50/70 px-4 py-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50">

                    <ShieldCheck
                      size={19}
                      strokeWidth={2}
                      className="text-emerald-600"
                    />

                  </div>

                  <p className="text-sm font-medium text-slate-700">
                    Sistema funcionando normalmente.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
}