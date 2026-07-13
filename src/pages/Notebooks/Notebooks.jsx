import { Layout, EmptyState, SearchBar, NotebookTable, NotebookModal } from '../../components';
import { Laptop } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { notebooks } from '../../data/notebooks';

export function Notebooks() {
  const location = useLocation();

  const [searchValue, setSearchValue] = useState('');
  const [filtro, setFiltro] = useState('todos');

  const [showModal, setShowModal] = useState(false);
  const [selectedNotebook, setSelectedNotebook] = useState(null);

  useEffect(() => {
    if (location.state?.filtro) {
      setFiltro(location.state.filtro);
    }
  }, [location.state]);

  const handleOpenModal = (notebook = null) => {
    setSelectedNotebook(notebook);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNotebook(null);
  };

  const handleSave = async (data) => {
    console.log('Notebook salvo:', data);
  };

  const notebooksFiltrados = notebooks.filter((notebook) => {
    const correspondeFiltro =
      filtro === 'todos' || notebook.status === filtro;

    const correspondeBusca =
      notebook.id.toLowerCase().includes(searchValue.toLowerCase()) ||
      notebook.modelo.toLowerCase().includes(searchValue.toLowerCase());

    return correspondeFiltro && correspondeBusca;
  });

  return (
    <Layout
      title="Gerenciar Notebooks"
      onSearchChange={setSearchValue}
      searchValue={searchValue}
    >
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Notebooks
            </h2>

            <p className="text-gray-600 mt-1">
              Gerencie o inventário de notebooks da escola
            </p>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            + Adicionar Notebook
          </button>
        </div>


        {/* Pesquisa e filtros */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 card-shadow">

          <SearchBar
            placeholder="Pesquisar por patrimônio, identificação ou modelo..."
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              ['todos', 'Todos'],
              ['disponivel', 'Disponíveis'],
              ['emprestado', 'Emprestados'],
              ['manutencao', 'Manutenção'],
            ].map(([valor, texto]) => (
              <button
                key={valor}
                onClick={() => setFiltro(valor)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  filtro === valor
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {texto}
              </button>
            ))}
          </div>

        </div>


        {/* Tabela de notebooks */}
        {notebooksFiltrados.length === 0 ? (
          <EmptyState
            title="Nenhum notebook encontrado"
            description="Tente alterar os filtros ou a pesquisa"
            icon={Laptop}
          />
        ) : (
          <NotebookTable notebooks={notebooksFiltrados} />
        )}


        {/* Modal de Notebook */}
        <NotebookModal
          isOpen={showModal}
          notebook={selectedNotebook}
          onSave={handleSave}
          onClose={handleCloseModal}
        />

      </div>
    </Layout>
  );
}