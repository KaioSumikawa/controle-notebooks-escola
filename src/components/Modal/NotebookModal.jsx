import { useState, useEffect } from 'react';
import { Modal } from './Modal';

const initialFormData = {
  modelo: '',
  patrimonio: '',
  localizacao: '',
  status: 'disponivel',
  observacao: '',
};

/**
 * Modal para criar/editar notebooks
 */
export function NotebookModal({
  isOpen = false,
  notebook = null,
  isLoading = false,
  onSave,
  onClose,
}) {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    if (notebook) {
      setFormData({
        modelo: notebook.modelo ?? '',
        patrimonio: notebook.patrimonio ?? '',
        localizacao: notebook.localizacao ?? '',
        status: notebook.status ?? 'disponivel',
        observacao: notebook.observacao ?? '',
      });
    } else {
      setFormData(initialFormData);
    }

    setError('');
  }, [isOpen, notebook]);

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
    resetForm();
    onClose?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (!formData.modelo.trim()) {
      setError('Modelo do notebook é obrigatório.');
      return;
    }

    try {
      await onSave?.({
        modelo: formData.modelo.trim(),
        patrimonio: formData.patrimonio.trim(),
        localizacao: formData.localizacao.trim(),
        status: formData.status,
        observacao: formData.observacao.trim(),
      });

      handleClose();
    } catch (err) {
      setError(err?.message || 'Erro ao salvar notebook.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={notebook ? 'Editar Notebook' : 'Novo Notebook'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Modelo */}
        <div>
          <label
            htmlFor="notebook-modelo"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Modelo do Notebook *
          </label>

          <input
            id="notebook-modelo"
            name="modelo"
            type="text"
            value={formData.modelo}
            onChange={handleChange}
            placeholder="Ex: Positivo Motion"
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />
        </div>

        {/* Patrimônio */}
        <div>
          <label
            htmlFor="notebook-patrimonio"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Patrimônio
          </label>

          <input
            id="notebook-patrimonio"
            name="patrimonio"
            type="text"
            value={formData.patrimonio}
            onChange={handleChange}
            placeholder="Ex: 123456"
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />
        </div>

        {/* Localização */}
        <div>
          <label
            htmlFor="notebook-localizacao"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Localização
          </label>

          <input
            id="notebook-localizacao"
            name="localizacao"
            type="text"
            value={formData.localizacao}
            onChange={handleChange}
            placeholder="Ex: Laboratório de Informática"
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="notebook-status"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Status
          </label>

          <select
            id="notebook-status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          >
            <option value="disponivel">Disponível</option>
            <option value="emprestado">Emprestado</option>
            <option value="manutencao">Manutenção</option>
          </select>
        </div>

        {/* Observação */}
        <div>
          <label
            htmlFor="notebook-observacao"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Observação
          </label>

          <textarea
            id="notebook-observacao"
            name="observacao"
            rows={3}
            value={formData.observacao}
            onChange={handleChange}
            placeholder="Ex: Tela com risco, carregador faltando..."
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />
        </div>

        {/* Erro */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Botões */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading
              ? 'Salvando...'
              : notebook
              ? 'Atualizar'
              : 'Cadastrar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}