import { Layout, DashboardCard } from '../../components';
import { BarChart3, PieChart, TrendingUp, Calendar } from 'lucide-react';
import { useState } from 'react';

export function Relatorios() {
  const [dateRange, setDateRange] = useState('month');

  return (
    <Layout title="Relatórios e Análises">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Relatórios</h2>
            <p className="text-gray-600 mt-1">Analise dados e gere relatórios personalizados</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
            <Calendar size={18} />
            Exportar
          </button>
        </div>

        {/* Date Range Selector */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 card-shadow">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setDateRange('week')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                dateRange === 'week'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Última Semana
            </button>
            <button 
              onClick={() => setDateRange('month')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                dateRange === 'month'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Este Mês
            </button>
            <button 
              onClick={() => setDateRange('year')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                dateRange === 'year'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Este Ano
            </button>
            <button 
              onClick={() => setDateRange('all')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                dateRange === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tudo
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total de Empréstimos"
            value="256"
            icon={BarChart3}
            variant="primary"
            trend={8}
          />
          <DashboardCard
            title="Taxa de Devolução"
            value="98.5%"
            icon={TrendingUp}
            variant="success"
            trend={2}
          />
          <DashboardCard
            title="Notebooks Danificados"
            value="2"
            icon={PieChart}
            variant="danger"
            trend={-1}
          />
          <DashboardCard
            title="Satisfação"
            value="4.8/5"
            icon={TrendingUp}
            variant="warning"
            trend={5}
          />
        </div>

        {/* Reports Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart Placeholder 1 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 card-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Empréstimos por Período</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Gráfico será implementado aqui</p>
            </div>
          </div>

          {/* Chart Placeholder 2 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 card-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição de Status</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Gráfico será implementado aqui</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
