import { Layout, EmptyState, SearchBar } from '../../components';
import { Package } from 'lucide-react';
import { useState } from 'react';

export function Devolucoes() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Layout title="Gerenciar Devoluções" onSearchChange={setSearchValue} searchValue={searchValue}>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Devoluções</h2>
            <p className="text-gray-600 mt-1">Registre as devoluções de notebooks</p>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            + Registrar Devolução
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 card-shadow">
          <SearchBar 
            placeholder="Pesquisar por aluno, notebook ou ID..." 
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
        </div>

        {/* Content Area */}
        <EmptyState 
          title="Nenhuma devolução registrada"
          description="As devoluções aparecerão aqui quando forem registradas"
          icon={Package}
        />
      </div>
    </Layout>
  );
}
