import { Layout, EmptyState, SearchBar, StatusBadge } from '../../components';
import { Clock } from 'lucide-react';
import { useState } from 'react';

export function Historico() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Layout title="Histórico de Transações" onSearchChange={setSearchValue} searchValue={searchValue}>
      <div className="space-y-6">
        {/* Header Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Histórico</h2>
          <p className="text-gray-600 mt-1">Visualize o histórico completo de todas as transações</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 card-shadow">
          <SearchBar 
            placeholder="Pesquisar por aluno, notebook ou transação..." 
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          
          {/* Filter Buttons */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors">
              Todas
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
              Empréstimos
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
              Devoluções
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
              Últimos 30 dias
            </button>
          </div>
        </div>

        {/* Content Area */}
        <EmptyState 
          title="Nenhuma transação encontrada"
          description="O histórico de transações aparecerá aqui"
          icon={Clock}
        />
      </div>
    </Layout>
  );
}
