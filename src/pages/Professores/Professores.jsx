import { useEffect, useMemo, useState } from 'react';
import {
  Layout,
  SearchBar,
  EmptyState,
  ProfessorTable,
  ProfessorModal,
  ConfirmModal,
  Toast,
} from '../../components';
import { GraduationCap } from 'lucide-react';
import { useProfessores } from '../../hooks/useProfessores';

export function Professores() {
  const {
    professores = [],
    isLoading,
    error,
    success,
    fetchProfessores,
    handleCreate,
    handleUpdate,
    handleDelete,
    clearMessages,
  } = useProfessores();

  const [searchValue, setSearchValue] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [professorDelete, setProfessorDelete] = useState(null);

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  useEffect(() => {
    fetchProfessores();
  }, [fetchProfessores]);

  useEffect(() => {
    if (success) {
      setToastMessage(success);
      setToastType('success');
      clearMessages();
    }
  }, [success, clearMessages]);

  useEffect(() => {
    if (error) {
      setToastMessage(error);
      setToastType('error');
      clearMessages();
    }
  }, [error, clearMessages]);

  const professoresFiltrados = useMemo(() => {
    if (!searchValue.trim()) return professores;

    const termo = searchValue.toLowerCase();

    return professores.filter((professor) =>
      [
        professor.nome,
        professor.email,
        professor.matricula,
      ]
        .filter(Boolean)
        .some((campo) => campo.toLowerCase().includes(termo))
    );
  }, [professores, searchValue]);

  const handleOpenModal = (professor = null) => {
    setSelectedProfessor(professor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProfessor(null);
    setShowModal(false);
  };

  const handleSave = async (data) => {
    try {
      if (selectedProfessor) {
        await handleUpdate(selectedProfessor.id, data);
      } else {
        await handleCreate(data);
      }

      handleCloseModal();
    } catch {
      // O hook já trata o erro e exibe o Toast
    }
  };

  const handleOpenDelete = (professor) => {
    setProfessorDelete(professor);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!professorDelete) return;

    try {
      await handleDelete(professorDelete.id);

      setProfessorDelete(null);
      setShowConfirm(false);
    } catch {
      // O hook já trata o erro e exibe o Toast
    }
  };

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
            onClick={() => handleOpenModal()}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-lg transition-colors"
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
        {professoresFiltrados.length === 0 ? (
          <EmptyState
            title="Nenhum professor cadastrado"
            description="Clique em 'Novo Professor' para adicionar o primeiro professor ao sistema."
            icon={GraduationCap}
          />
        ) : (
          <ProfessorTable
            professores={professoresFiltrados}
            onEdit={handleOpenModal}
            onDelete={handleOpenDelete}
          />
        )}

        {/* Modal */}
        <ProfessorModal
          isOpen={showModal}
          professor={selectedProfessor}
          isLoading={isLoading}
          onSave={handleSave}
          onClose={handleCloseModal}
        />

        {/* Confirmação */}
        <ConfirmModal
          isOpen={showConfirm}
          title="Excluir Professor"
          message={`Tem certeza que deseja excluir o professor "${professorDelete?.nome}"?`}
          confirmText="Excluir"
          cancelText="Cancelar"
          variant="danger"
          isLoading={isLoading}
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setShowConfirm(false);
            setProfessorDelete(null);
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