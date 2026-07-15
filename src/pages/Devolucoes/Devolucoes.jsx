import {
  Layout,
  EmptyState,
  SearchBar,
} from '../../components';
import { Package, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useEmprestimos } from '../../hooks/useEmprestimos';

export function Devolucoes() {
  const [searchValue, setSearchValue] = useState('');

  const {
    emprestimos,
    handleDevolver,
  } = useEmprestimos();

  const emprestimosAtivos = useMemo(() => {
    const busca = searchValue.toLowerCase();

    return emprestimos.filter((emprestimo) => {
      if (emprestimo.status !== 'ativo') {
        return false;
      }

      return (
        emprestimo.professor.toLowerCase().includes(busca) ||
        emprestimo.turma.toLowerCase().includes(busca) ||
        emprestimo.notebookId.toLowerCase().includes(busca)
      );
    });
  }, [emprestimos, searchValue]);

  const registrarDevolucao = async (id) => {
    if (
      !window.confirm(
        'Deseja realmente registrar a devolução deste notebook?'
      )
    ) {
      return;
    }

    await handleDevolver(id);
  };

  return (
    <Layout
      title="Gerenciar Devoluções"
      onSearchChange={setSearchValue}
      searchValue={searchValue}
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Devoluções
          </h2>

          <p className="text-gray-600 mt-1">
            Registre a devolução dos notebooks emprestados.
          </p>
        </div>

        {/* Pesquisa */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 card-shadow">
          <SearchBar
            placeholder="Pesquisar por professor, turma ou notebook..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        {/* Conteúdo */}
        {emprestimosAtivos.length === 0 ? (
          <EmptyState
            title="Nenhum empréstimo pendente"
            description="Todos os notebooks já foram devolvidos."
            icon={Package}
          />
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 card-shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">
                      Notebook
                    </th>

                    <th className="px-6 py-4 text-left font-semibold">
                      Professor
                    </th>

                    <th className="px-6 py-4 text-left font-semibold">
                      Turma
                    </th>

                    <th className="px-6 py-4 text-left font-semibold">
                      Data
                    </th>

                    <th className="px-6 py-4 text-center font-semibold">
                      Ação
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {emprestimosAtivos.map((emprestimo) => (
                    <tr
                      key={emprestimo.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-medium">
                        {emprestimo.notebookId}
                      </td>

                      <td className="px-6 py-4">
                        {emprestimo.professor}
                      </td>

                      <td className="px-6 py-4">
                        {emprestimo.turma}
                      </td>

                      <td className="px-6 py-4">
                        {emprestimo.dataEmprestimo}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <button
                            type="button"
                            onClick={() =>
                              registrarDevolucao(emprestimo.id)
                            }
                            className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                          >
                            <RotateCcw size={16} />
                            Registrar Devolução
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}