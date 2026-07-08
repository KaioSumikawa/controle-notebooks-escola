import { Layout, NotebookCard, EmptyState, SearchBar } from '../../components';
import { Laptop } from 'lucide-react';
import { useState } from 'react';

export function Notebooks() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Layout title="Gerenciar Notebooks" onSearchChange={setSearchValue} searchValue={searchValue}>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Notebooks</h2>
            <p className="text-gray-600 mt-1">Gerencie o inventário de notebooks da escola</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            + Adicionar Notebook
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 card-shadow">
          <SearchBar 
            placeholder="Pesquisar por modelo, número de série ou ID..." 
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          
          {/* Filter Buttons */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors">
              Todos
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
              Disponíveis
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
              Emprestados
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
              Manutenção
            </button>
          </div>
        </div>

        {/* Content Area */}
        <EmptyState 
          title="Nenhum notebook cadastrado"
          description="Comece adicionando notebooks ao inventário"
          icon={Laptop}
        />
      </div>
    </Layout>
  );
}
