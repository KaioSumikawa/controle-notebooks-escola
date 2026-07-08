import { useState, useEffect } from 'react';
import { Modal } from './Modal';

/**
 * Modal para criar/editar turmas
 */
export function TurmaModal({
  isOpen = false,
  turma = null,
  isLoading = false,
  onSave,
  onClose,
}) {
  const [nome, setNome] = useState('');
  const [error, setError] = useState('');

  // Reset form quando modal abre/fecha ou turma muda
  useEffect(() => {
    if (isOpen) {
      if (turma) {
        setNome(turma.nome);
      } else {
        setNome('');
      }
      setError('');
    }
  }, [isOpen, turma]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!nome.trim()) {
      setError('Nome da turma é obrigatório');
      return;
    }

    try {
      await onSave({ nome: nome.trim() });
      setNome('');
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={turma ? 'Editar Turma' : 'Nova Turma'}
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Nome */}
        <div>
          <label htmlFor="turma-nome" className="block text-sm font-medium text-gray-700 mb-2">
            Nome da Turma *
          </label>
          <input
            id="turma-nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: 1º Ano - Turma A"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            disabled={isLoading}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Salvando...' : turma ? 'Atualizar' : 'Criar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
