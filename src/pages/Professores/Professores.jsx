import {
  Layout,
  EmptyState,
  SearchBar,
} from '../../components';
import { GraduationCap } from 'lucide-react';
import { useState } from 'react';

export function Professores() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Layout
      title="Gerenciar Professores"
      onSearchChange={setSearchValue}
      searchValue={searchValue}
    >
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Professores
            </h2>

            <p className="text-gray-600 mt-1">
              Gerencie os professores cadastrados no sistema.
            </p>
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            + Novo Professor
          </button>
        </div>

        {/* Pesquisa */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 card-shadow">
          <SearchBar
            placeholder="Pesquisar por nome, matrícula ou e-mail..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        {/* Conteúdo */}
        <EmptyState
          title="Nenhum professor cadastrado"
          description="Clique em 'Novo Professor' para adicionar o primeiro professor ao sistema."
          icon={GraduationCap}
        />

      </div>
    </Layout>
  );
}