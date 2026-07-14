import { Layout, DashboardCard } from '../../components';
import {
  Laptop,
  CheckCircle2,
  ClipboardList,
  Wrench,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotebooks } from '../../hooks/useNotebooks';
import { useEmprestimos } from '../../hooks/useEmprestimos';

export function Dashboard() {
  const navigate = useNavigate();

  const { notebooks = [] } = useNotebooks();
  const { emprestimos = [] } = useEmprestimos();

  // Estatísticas dos notebooks
  const totalNotebooks = notebooks.length;

  const notebooksDisponiveis = notebooks.filter(
    (notebook) => notebook.status === 'disponivel'
  ).length;

  const notebooksManutencao = notebooks.filter(
    (notebook) => notebook.status === 'manutencao'
  ).length;

  // Empréstimos ativos
  const emprestimosAtivos = emprestimos.filter(
    (emprestimo) => emprestimo.status === 'ativo'
  );

  return (
    <Layout title="Dashboard">
      <div className="space-y-8">

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

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

            <div className="space-y-5">

              {emprestimosAtivos.length === 0 ? (
                <p className="text-gray-500">
                  Nenhum empréstimo ativo.
                </p>
              ) : (
                emprestimosAtivos
                  .slice(0, 5)
                  .map((emprestimo) => (
                    <div
                      key={emprestimo.id}
                      className="flex items-center justify-between border-b border-gray-100 pb-4"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          Notebook {emprestimo.notebookId}
                        </p>

                        <p className="text-sm text-gray-500">
                          {emprestimo.professor} • {emprestimo.turma}
                        </p>
                      </div>

                      <span className="text-sm text-gray-400">
                        {emprestimo.dataEmprestimo} • {emprestimo.horaEmprestimo}
                      </span>
                    </div>
                  ))
              )}

            </div>

          </div>

          {/* Lado direito */}
          <div className="space-y-6">

            {/* Resumo */}
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
                    Empréstimos Ativos
                  </span>

                  <span className="font-semibold">
                    {emprestimosAtivos.length}
                  </span>
                </div>

              </div>

            </div>

            {/* Avisos */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 card-shadow">

              <h2 className="text-lg font-semibold text-gray-900 mb-5">
                Avisos
              </h2>

              <div className="space-y-3 text-sm">

                <div className="flex items-start gap-2">
                  <span>🟢</span>

                  <p>
                    {notebooksManutencao === 0
                      ? 'Nenhum notebook em manutenção.'
                      : `${notebooksManutencao} notebook(s) em manutenção.`}
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <span>📚</span>

                  <p>
                    {emprestimosAtivos.length} empréstimo(s) ativo(s) no momento.
                  </p>
                </div>

                <div className="flex items-start gap-2">
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