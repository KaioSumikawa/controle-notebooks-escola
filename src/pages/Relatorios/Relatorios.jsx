import { useState } from 'react';
import {
  Layout,
  DashboardCard,
} from '../../components';

import {
  BarChart3,
  Laptop,
  CheckCircle2,
  AlertTriangle,
  Calendar,
} from 'lucide-react';

export function Relatorios() {
  const [dateRange, setDateRange] = useState('month');

  const filtros = [
    ['week', 'Última Semana'],
    ['month', 'Este Mês'],
    ['year', 'Este Ano'],
    ['all', 'Todo o Período'],
  ];

  return (
    <Layout title="Relatórios">
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Relatórios
            </h2>

            <p className="text-gray-600 mt-1">
              Acompanhe indicadores e estatísticas do sistema.
            </p>
          </div>

          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Calendar size={18} />
            Exportar Relatório
          </button>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 card-shadow">
          <div className="flex flex-wrap gap-2">
            {filtros.map(([value, label]) => (
              <button
                key={value}
                onClick={() => setDateRange(value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  dateRange === value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <DashboardCard
            title="Empréstimos"
            value="0"
            icon={BarChart3}
            variant="primary"
          />

          <DashboardCard
            title="Notebooks Disponíveis"
            value="0"
            icon={Laptop}
            variant="success"
          />

          <DashboardCard
            title="Devoluções"
            value="0"
            icon={CheckCircle2}
            variant="warning"
          />

          <DashboardCard
            title="Em Manutenção"
            value="0"
            icon={AlertTriangle}
            variant="danger"
          />

        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white rounded-lg border border-gray-200 p-6 card-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Empréstimos por Período
            </h3>

            <div className="h-72 flex items-center justify-center rounded-lg bg-gray-50 border border-dashed border-gray-300">
              <p className="text-gray-500">
                Gráfico em desenvolvimento
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 card-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Situação dos Notebooks
            </h3>

            <div className="h-72 flex items-center justify-center rounded-lg bg-gray-50 border border-dashed border-gray-300">
              <p className="text-gray-500">
                Gráfico em desenvolvimento
              </p>
            </div>
          </div>

        </div>

      </div>
    </Layout>
  );
}