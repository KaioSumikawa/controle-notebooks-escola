import { useState, useEffect } from 'react';
import { Modal } from './Modal';

const getToday = () => new Date().toISOString().split('T')[0];

const initialFormData = {
  notebook: '',
  professor: '',
  turma: '',
  dataEmprestimo: getToday(),
  observacao: '',
};

/**
 * Modal para registrar empréstimos de notebooks
 */
export function EmprestimoModal({
  isOpen = false,
  emprestimo = null,
  notebooks = [],
  turmas = [],
  isLoading = false,
  onSave,
  onClose,
}) {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    if (emprestimo) {
      setFormData({
        notebook: emprestimo.notebook ?? '',
        professor: emprestimo.professor ?? '',
        turma: emprestimo.turma ?? '',
        dataEmprestimo: emprestimo.dataEmprestimo ?? getToday(),
        observacao: emprestimo.observacao ?? '',
      });
    } else {
      setFormData({
        ...initialFormData,
        dataEmprestimo: getToday(),
      });
    }

    setError('');
  }, [isOpen, emprestimo]);

  const resetForm = () => {
    setFormData({
      ...initialFormData,
      dataEmprestimo: getToday(),
    });

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

    if (!formData.notebook) {
      setError('Selecione um notebook.');
      return;
    }

    if (!formData.professor.trim()) {
      setError('Informe o professor responsável.');
      return;
    }

    if (!formData.turma.trim()) {
      setError('Informe a turma.');
      return;
    }

    try {
      await onSave?.({
        notebook: formData.notebook,
        professor: formData.professor.trim(),
        turma: formData.turma.trim(),
        dataEmprestimo: formData.dataEmprestimo,
        observacao: formData.observacao.trim(),
      });

      handleClose();
    } catch (err) {
      setError(err?.message || 'Erro ao registrar empréstimo.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={emprestimo ? 'Editar Empréstimo' : 'Novo Empréstimo'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Notebook */}
        <div>
          <label
            htmlFor="notebook"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Notebook *
          </label>

          <select
            id="notebook"
            name="notebook"
            value={formData.notebook}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          >
            <option value="">Selecione um notebook</option>

            {notebooks.map((notebook) => (
              <option
                key={notebook.id}
                value={notebook.id}
              >
                {notebook.id} - {notebook.modelo}
              </option>
            ))}
          </select>
        </div>

        {/* Professor */}
        <div>
          <label
            htmlFor="professor"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Professor *
          </label>

          <input
            id="professor"
            name="professor"
            type="text"
            value={formData.professor}
            onChange={handleChange}
            placeholder="Nome do professor"
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />
        </div>

        {/* Turma */}
        <div>
          <label
            htmlFor="turma"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Turma *
          </label>

          {turmas.length > 0 ? (
            <select
              id="turma"
              name="turma"
              value={formData.turma}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            >
              <option value="">Selecione uma turma</option>

              {turmas.map((turma) => (
                <option
                  key={turma.id}
                  value={turma.nome}
                >
                  {turma.nome}
                </option>
              ))}
            </select>
          ) : (
            <input
              id="turma"
              name="turma"
              type="text"
              value={formData.turma}
              onChange={handleChange}
              placeholder="Ex: 2º Ano A"
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          )}
        </div>

        {/* Data */}
        <div>
          <label
            htmlFor="dataEmprestimo"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Data do Empréstimo
          </label>

          <input
            id="dataEmprestimo"
            name="dataEmprestimo"
            type="date"
            value={formData.dataEmprestimo}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />
        </div>

        {/* Observação */}
        <div>
          <label
            htmlFor="observacao"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Observação
          </label>

          <textarea
            id="observacao"
            name="observacao"
            rows={3}
            value={formData.observacao}
            onChange={handleChange}
            placeholder="Observações sobre o empréstimo..."
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />
        </div>

        {/* Erro */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* Botões */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading
              ? 'Salvando...'
              : emprestimo
                ? 'Atualizar'
                : 'Registrar Empréstimo'}
          </button>
        </div>
      </form>
    </Modal>
  );
}