import { useMemo, useState } from 'react';
import {
  Layout,
  EmptyState,
  SearchBar,
  EmprestimoModal,
  EmprestimoTable,
} from '../../components';
import { ClipboardList } from 'lucide-react';
import { useEmprestimos } from '../../hooks/useEmprestimos';

export function Emprestimos() {
  const [searchValue, setSearchValue] = useState('');
  const [showModal, setShowModal] = useState(false);

  const {
    emprestimos = [],
    isLoading,
    handleCreate,
  } = useEmprestimos();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = async (data) => {
    await handleCreate(data);
    handleCloseModal();
  };

  const emprestimosFiltrados = useMemo(() => {
    const busca = searchValue.trim().toLowerCase();

    if (!busca) return emprestimos;

    return emprestimos.filter((emprestimo) => {
      return (
        emprestimo.professor?.toLowerCase().includes(busca) ||
        emprestimo.turma?.toLowerCase().includes(busca) ||
        emprestimo.notebookId?.toLowerCase().includes(busca)
      );
    });
  }, [emprestimos, searchValue]);

  return (
    <Layout
      title="Gerenciar Empréstimos"
      showSearch
      searchPlaceholder="Pesquisar por professor, turma ou notebook..."
      searchValue={searchValue}
      onSearchChange={setSearchValue}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Empréstimos
            </h2>

            <p className="text-gray-600 mt-1">
              Gerencie todos os empréstimos de notebooks.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            + Novo Empréstimo
          </button>
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
        {emprestimosFiltrados.length === 0 ? (
          <EmptyState
            title={
              isLoading
                ? 'Carregando empréstimos...'
                : 'Nenhum empréstimo encontrado'
            }
            description={
              isLoading
                ? 'Aguarde alguns instantes.'
                : 'Clique em "Novo Empréstimo" para registrar um empréstimo.'
            }
            icon={ClipboardList}
          />
        ) : (
          <EmprestimoTable
            emprestimos={emprestimosFiltrados}
          />
        )}

        {/* Modal */}
        <EmprestimoModal
          isOpen={showModal}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      </div>
    </Layout>
  );
}