import {
  Layout,
  EmptyState,
  SearchBar,
} from '../../components';
import QRCodeActionCard from '../../components/QRCodeActionCard/QRCodeActionCard';
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

  const handleOpenScanner = () => {
    // Futuramente abrirá o modal da câmera
    console.log('Abrir scanner QR Code');
  };

  return (
    <Layout
      title="Gerenciar Devoluções"
      onSearchChange={setSearchValue}
      searchValue={searchValue}
    >
      <div className="space-y-6">
        {/* Pesquisa */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 card-shadow">
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
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white card-shadow">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-200 bg-gray-50">
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
                      className="border-b border-gray-100 transition-colors hover:bg-gray-50"
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
                            className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
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

        {/* Ação rápida por QR Code */}
        <QRCodeActionCard
          title="Devolução rápida com QR Code"
          description="Escaneie o código do notebook para localizar automaticamente o empréstimo ativo e registrar a devolução em poucos segundos."
          buttonText="Escanear QR Code"
          onScan={handleOpenScanner}
        />
      </div>
    </Layout>
  );
}