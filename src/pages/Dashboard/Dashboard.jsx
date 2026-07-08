import { Layout } from '../../components';
import { DashboardCard } from '../../components';
import { Laptop, ClipboardList, Package, TrendingUp } from 'lucide-react';

export function Dashboard() {
  return (
    <Layout title="Dashboard">
      <div className="space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Notebooks Disponíveis"
            value="28"
            icon={Laptop}
            variant="primary"
            trend={5}
            description="Aptos para empréstimo"
          />
          <DashboardCard
            title="Empréstimos Ativos"
            value="12"
            icon={ClipboardList}
            variant="warning"
            trend={-2}
            description="Em posse de usuários"
          />
          <DashboardCard
            title="Devoluções Pendentes"
            value="3"
            icon={Package}
            variant="danger"
            trend={0}
            description="Aguardando devolução"
          />
          <DashboardCard
            title="Total de Transações"
            value="256"
            icon={TrendingUp}
            variant="success"
            trend={12}
            description="Este mês"
          />
        </div>

        {/* Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6 card-shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Empréstimo #{1000 + item}
                    </p>
                    <p className="text-xs text-gray-500">Aluno recebeu Notebook Dell Inspiron</p>
                  </div>
                  <span className="text-xs text-gray-400">há 2 horas</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 card-shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumo Rápido</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Taxa de Utilização</p>
                  <span className="text-sm font-semibold text-gray-900">73%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '73%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Saúde do Inventário</p>
                  <span className="text-sm font-semibold text-gray-900">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Conformidade</p>
                  <span className="text-sm font-semibold text-gray-900">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
