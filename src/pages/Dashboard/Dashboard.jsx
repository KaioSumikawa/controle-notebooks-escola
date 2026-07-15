import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Laptop,
  CheckCircle2,
  ClipboardList,
  Wrench,
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

  return (
    <Layout title="Dashboard">
      <div className="space-y-8">

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

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

        {/* Conteúdo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Últimos empréstimos */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6 card-shadow">

            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Últimos Empréstimos
            </h2>

            {ultimosEmprestimos.length === 0 ? (
              <div className="flex items-center justify-center py-10">
                <p className="text-gray-500">
                  Nenhum empréstimo ativo.
                </p>
              </div>
            ) : (
              <div className="space-y-5">

                {ultimosEmprestimos.map((emprestimo) => (
                  <div
                    key={emprestimo.id}
                    className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-none last:pb-0"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        Notebook {emprestimo.notebookId}
                      </p>

                      <p className="text-sm text-gray-500">
                        {emprestimo.professor} • {emprestimo.turma}
                      </p>
                    </div>

                    <span className="text-sm text-gray-400 whitespace-nowrap">
                      {emprestimo.dataEmprestimo} • {emprestimo.horaEmprestimo}
                    </span>
                  </div>
                ))}

              </div>
            )}

          </div>

          {/* Painel lateral */}
          <div className="space-y-6">

            <div className="bg-white rounded-lg border border-gray-200 p-6 card-shadow">

              <h2 className="text-lg font-semibold text-gray-900 mb-5">
                Resumo Geral
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Total de Notebooks
                  </span>

                  <span className="font-semibold">
                    {totalNotebooks}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Disponíveis
                  </span>

                  <span className="font-semibold">
                    {notebooksDisponiveis}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Emprestados
                  </span>

                  <span className="font-semibold">
                    {emprestimosAtivos.length}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Em Manutenção
                  </span>

                  <span className="font-semibold">
                    {notebooksManutencao}
                  </span>
                </div>

              </div>

            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 card-shadow">

              <h2 className="text-lg font-semibold text-gray-900 mb-5">
                Avisos
              </h2>

              <div className="space-y-4 text-sm">

                <div className="flex gap-2">
                  <span>🟢</span>

                  <p>
                    {notebooksManutencao === 0
                      ? 'Nenhum notebook em manutenção.'
                      : `${notebooksManutencao} notebook(s) em manutenção.`}
                  </p>
                </div>

                <div className="flex gap-2">
                  <span>📚</span>

                  <p>
                    {emprestimosAtivos.length} empréstimo(s) ativo(s) no
                    momento.
                  </p>
                </div>

                <div className="flex gap-2">
                  <span>✅</span>

                  <p>
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