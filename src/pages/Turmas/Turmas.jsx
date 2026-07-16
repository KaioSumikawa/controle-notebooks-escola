import { useEffect, useMemo, useState } from 'react';
import { Plus, Users } from 'lucide-react';

import {
  Layout,
  SearchBar,
  EmptyState,
  TurmaTable,
  TurmaModal,
  ConfirmModal,
  Toast,
} from '../../components';

import { useTurmas } from '../../hooks/useTurmas';

export function Turmas() {
  const {
    turmas = [],
    isLoading,
    error,
    success,
    fetchTurmas,
    handleCreate,
    handleUpdate,
    handleDelete,
    clearMessages,
  } = useTurmas();

  const [searchValue, setSearchValue] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTurma, setSelectedTurma] = useState(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [turmaToDelete, setTurmaToDelete] = useState(null);

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  useEffect(() => {
    fetchTurmas();
  }, []);

  useEffect(() => {
    if (success) {
      setToastMessage(success);
      setToastType('success');
      clearMessages();
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      setToastMessage(error);
      setToastType('error');
      clearMessages();
    }
  }, [error]);

  const turmasFiltradas = useMemo(() => {
    if (!searchValue.trim()) return turmas;

    const termo = searchValue.toLowerCase();

    return turmas.filter((turma) =>
      turma.nome?.toLowerCase().includes(termo)
    );
  }, [turmas, searchValue]);

  const handleOpenModal = (turma = null) => {
    setSelectedTurma(turma);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTurma(null);
    setIsModalOpen(false);
  };

  const handleSave = async (data) => {
    if (selectedTurma) {
      await handleUpdate(selectedTurma.id, data);
    } else {
      await handleCreate(data);
    }

    handleCloseModal();
  };

  const handleOpenDelete = (turma) => {
    setTurmaToDelete(turma);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!turmaToDelete) return;

    await handleDelete(turmaToDelete.id);

    setTurmaToDelete(null);
    setIsConfirmOpen(false);
  };

  return (
    <Layout
      title="Gerenciar Turmas"
      onSearchChange={setSearchValue}
      searchValue={searchValue}
    >
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Turmas
            </h2>

            <p className="text-gray-600 mt-1">
              Gerencie as turmas cadastradas.
            </p>
          </div>

          <button
            onClick={() => handleOpenModal()}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            Nova Turma
          </button>
        </div>

        {/* Pesquisa */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 card-shadow">
          <SearchBar
            placeholder="Pesquisar turma..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        {/* Conteúdo */}
        {turmasFiltradas.length === 0 ? (
          <EmptyState
            title="Nenhuma turma cadastrada"
            description="Clique em 'Nova Turma' para adicionar a primeira turma."
            icon={Users}
          />
        ) : (
          <TurmaTable
            turmas={turmasFiltradas}
            onEdit={handleOpenModal}
            onDelete={handleOpenDelete}
          />
        )}

        {/* Modal */}
        <TurmaModal
          isOpen={isModalOpen}
          turma={selectedTurma}
          isLoading={isLoading}
          onSave={handleSave}
          onClose={handleCloseModal}
        />

        {/* Confirmação */}
        <ConfirmModal
          isOpen={isConfirmOpen}
          title="Excluir Turma"
          message={`Tem certeza que deseja excluir a turma "${turmaToDelete?.nome}"?`}
          confirmText="Excluir"
          cancelText="Cancelar"
          variant="danger"
          isLoading={isLoading}
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setIsConfirmOpen(false);
            setTurmaToDelete(null);
          }}
        />

        {/* Toast */}
        {toastMessage && (
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setToastMessage('')}
          />
        )}

      </div>
    </Layout>
  );
}