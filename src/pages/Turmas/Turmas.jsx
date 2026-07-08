import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, AlertCircle } from 'lucide-react';
import { Layout, TurmaModal, ConfirmModal, Toast } from '../../components';
import { useTurmas } from '../../hooks/useTurmas';

export function Turmas() {
  const {
    turmas,
    isLoading,
    error,
    success,
    fetchTurmas,
    handleCreate,
    handleUpdate,
    handleDelete,
    clearMessages,
  } = useTurmas();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTurma, setSelectedTurma] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [turmaToDelete, setTurmaToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  // Carregar turmas ao montar
  useEffect(() => {
    fetchTurmas();
  }, [fetchTurmas]);

  // Mostrar mensagens de sucesso/erro
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

  const handleOpenModal = (turma = null) => {
    setSelectedTurma(turma);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTurma(null);
  };

  const handleSave = async (data) => {
    try {
      if (selectedTurma) {
        await handleUpdate(selectedTurma.id, data);
      } else {
        await handleCreate(data);
      }
    } catch (err) {
      // Erro já é tratado pelo hook
    }
  };

  const handleOpenConfirmDelete = (turma) => {
    setTurmaToDelete(turma);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (turmaToDelete) {
        await handleDelete(turmaToDelete.id);
        setIsConfirmOpen(false);
        setTurmaToDelete(null);
      }
    } catch (err) {
      // Erro já é tratado pelo hook
    }
  };

  return (
    <Layout title="Gerenciar Turmas">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Turmas</h2>
            <p className="text-gray-600 mt-1">Gerencie as turmas/classes da escola</p>
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

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle size={20} className="text-red-600" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && turmas.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-96 py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600">Carregando turmas...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && turmas.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-96 py-12 bg-white rounded-lg border border-gray-200">
            <div className="text-gray-300 mb-4">
              <AlertCircle size={64} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhuma turma cadastrada</h3>
            <p className="text-gray-400 text-center max-w-sm mb-6">
              Comece criando uma nova turma clicando no botão acima
            </p>
          </div>
        )}

        {/* Turmas List */}
        {!isLoading && turmas.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 card-shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Nome da Turma
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Criada em
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {turmas.map((turma) => (
                    <tr key={turma.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-medium text-gray-900">{turma.nome}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-600">
                          {new Date(turma.created_at).toLocaleDateString('pt-BR')}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-2">
                        <button
                          onClick={() => handleOpenModal(turma)}
                          disabled={isLoading}
                          className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg transition-colors disabled:opacity-50"
                        >
                          <Edit2 size={14} />
                          Editar
                        </button>
                        <button
                          onClick={() => handleOpenConfirmDelete(turma)}
                          disabled={isLoading}
                          className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors disabled:opacity-50"
                        >
                          <Trash2 size={14} />
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Turma Modal */}
      <TurmaModal
        isOpen={isModalOpen}
        turma={selectedTurma}
        isLoading={isLoading}
        onSave={handleSave}
        onClose={handleCloseModal}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Excluir Turma"
        message={`Tem certeza que deseja excluir a turma "${turmaToDelete?.nome}"? Esta ação não pode ser desfeita.`}
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

      {/* Toast Message */}
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage('')}
      />
    </Layout>
  );
}
