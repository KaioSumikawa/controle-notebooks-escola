import {
  Layout,
  EmptyState,
  SearchBar,
  NotebookTable,
  NotebookModal,
  Toast,
} from '../../components';

import {
  Laptop,
  Plus,
} from 'lucide-react';

import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useLocation } from 'react-router-dom';
import { useNotebooks } from '../../hooks/useNotebooks';

export function Notebooks() {
  const location = useLocation();

  const {
    notebooks,
    isLoading,
    error,
    success,
    handleCreate,
    handleUpdate,
    clearMessages,
  } = useNotebooks();

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
    setSelectedNotebook(null);
    setShowModal(false);
  };

  const handleSave = async (data) => {
    if (selectedNotebook) {
      await handleUpdate(selectedNotebook.id, data);
    } else {
      await handleCreate(data);
    }

    handleCloseModal();
  };

  const notebooksFiltrados = useMemo(() => {
    const busca = searchValue.toLowerCase();

    return notebooks.filter((notebook) => {
      const correspondeFiltro =
        filtro === 'todos' ||
        notebook.status === filtro;

      const correspondeBusca =
        notebook.id.toLowerCase().includes(busca) ||
        (notebook.modelo || '')
          .toLowerCase()
          .includes(busca) ||
        (notebook.patrimonio || '')
          .toLowerCase()
          .includes(busca);

      return (
        correspondeFiltro &&
        correspondeBusca
      );
    });
  }, [notebooks, filtro, searchValue]);

  const filtros = [
    ['todos', 'Todos'],
    ['disponivel', 'Disponíveis'],
    ['emprestado', 'Emprestados'],
    ['manutencao', 'Manutenção'],
  ];

  return (
    <Layout
      title="Notebooks"
      onSearchChange={setSearchValue}
      searchValue={searchValue}
    >
      <div className="space-y-8">

        {/* Cabeçalho */}
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Notebooks
            </h2>

            <p className="mt-2 text-slate-500">
              Gerencie todo o inventário de notebooks da escola.
            </p>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              py-3
              font-medium
              text-white
              shadow-sm
              transition-all
              hover:bg-blue-700
              hover:shadow-lg
            "
          >
            <Plus size={18} />

            Novo Notebook
          </button>

        </div>

        {/* Pesquisa + filtros */}
        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm
            space-y-5
          "
        >

          <SearchBar
            placeholder="Pesquisar por patrimônio, identificação ou modelo..."
            value={searchValue}
            onChange={(e) =>
              setSearchValue(e.target.value)
            }
          />

          <div className="flex flex-wrap gap-2">

            {filtros.map(([valor, texto]) => (

              <button
                key={valor}
                onClick={() => setFiltro(valor)}
                className={`
                  rounded-full
                  px-4
                  py-2
                  text-sm
                  font-medium
                  transition-all

                  ${
                    filtro === valor
                      ? 'bg-blue-600 text-white shadow-sm'
                      : `
                        bg-slate-100
                        text-slate-600
                        hover:bg-slate-200
                      `
                  }
                `}
              >
                {texto}
              </button>

            ))}

          </div>

          <div className="border-t border-slate-200 pt-4">

            <p className="text-sm text-slate-500">

              <span className="font-semibold text-slate-700">
                {notebooksFiltrados.length}
              </span>

              {' '}
              notebook
              {notebooksFiltrados.length !== 1 && 's'}
              {' '}
              encontrado
              {notebooksFiltrados.length !== 1 && 's'}

            </p>

          </div>

        </div>

        {/* Conteúdo */}

        {notebooksFiltrados.length === 0 ? (

          <EmptyState
            title={
              isLoading
                ? 'Carregando notebooks...'
                : 'Nenhum notebook encontrado'
            }
            description={
              isLoading
                ? 'Aguarde um instante.'
                : 'Tente alterar os filtros ou a pesquisa.'
            }
            icon={Laptop}
          />

        ) : (

          <NotebookTable
            notebooks={notebooksFiltrados}
            onEdit={handleOpenModal}
          />

        )}

        {/* Modal */}

        <NotebookModal
          isOpen={showModal}
          notebook={selectedNotebook}
          isLoading={isLoading}
          onSave={handleSave}
          onClose={handleCloseModal}
        />

        {/* Toast */}

        <Toast
          message={success || error}
          type={
            error
              ? 'error'
              : 'success'
          }
          onClose={clearMessages}
        />

      </div>
    </Layout>
  );
}