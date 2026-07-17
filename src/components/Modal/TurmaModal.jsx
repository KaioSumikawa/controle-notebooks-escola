import { useEffect, useState } from 'react';
import { Modal } from './Modal';

const initialFormData = {
  nome: '',
};

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
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    if (turma) {
      setFormData({
        nome: turma.nome ?? '',
      });
    } else {
      setFormData(initialFormData);
    }

    setError('');
  }, [isOpen, turma]);

  const resetForm = () => {
    setFormData(initialFormData);
    setError('');
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    if (isLoading) return;

    resetForm();
    onClose?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (!formData.nome.trim()) {
      setError('Nome da turma é obrigatório.');
      return;
    }

    try {
      await onSave?.({
        nome: formData.nome.trim(),
      });

      handleClose();
    } catch (err) {
      setError(
        err?.message || 'Erro ao salvar turma.'
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={turma ? 'Editar Turma' : 'Nova Turma'}
      size="sm"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Nome */}
        <div>
          <label
            htmlFor="turma-nome"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Nome da Turma *
          </label>

          <input
            id="turma-nome"
            name="nome"
            type="text"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Ex: 1º Ano A"
            disabled={isLoading}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              transition
              focus:border-blue-500
              focus:outline-none
              focus:ring-4
              focus:ring-blue-100
            "
          />
        </div>

        {/* Erro */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* Botões */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="
              flex-1
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              font-medium
              text-slate-700
              transition
              hover:bg-slate-50
              hover:border-slate-300
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="
              flex-1
              rounded-xl
              bg-blue-600
              px-4
              py-3
              font-semibold
              text-white
              transition
              hover:bg-blue-700
              hover:shadow-lg
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {isLoading
              ? 'Salvando...'
              : turma
                ? 'Atualizar'
                : 'Cadastrar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}