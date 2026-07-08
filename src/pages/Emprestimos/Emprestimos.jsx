import { Layout, EmptyState, SearchBar } from '../../components';
import { ClipboardList } from 'lucide-react';
import { useState } from 'react';

export function Emprestimos() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Layout title="Gerenciar Empréstimos" onSearchChange={setSearchValue} searchValue={searchValue}>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Empréstimos</h2>
            <p className="text-gray-600 mt-1">Gerencie todos os empréstimos de notebooks</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            + Novo Empréstimo
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
          title="Nenhum empréstimo registrado"
          description="Comece criando um novo empréstimo clicando no botão acima"
          icon={ClipboardList}
        />
      </div>
    </Layout>
  );
}
