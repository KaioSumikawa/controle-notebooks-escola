import { useEffect, useState } from 'react';
import { Modal } from './Modal';

const getToday = () => new Date().toISOString().split('T')[0];

const createInitialState = () => ({
  notebook: '',
  professor: '',
  turma: '',
  dataEmprestimo: getToday(),
  observacao: '',
});

/**
 * Modal para registrar/editar empréstimos
 */
export function EmprestimoModal({
  isOpen = false,
  emprestimo = null,
  notebooks = [],
  professores = [],
  turmas = [],
  isLoading = false,
  onSave,
  onClose,
}) {
  const [formData, setFormData] = useState(createInitialState());
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
      setFormData(createInitialState());
    }

    setError('');
  }, [isOpen, emprestimo]);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setFormData(createInitialState());
    setError('');
    onClose?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (!formData.notebook) {
      setError('Selecione um notebook.');
      return;
    }

    if (!formData.professor) {
      setError('Selecione um professor.');
      return;
    }

    if (!formData.turma) {
      setError('Selecione uma turma.');
      return;
    }

    try {
      await onSave?.({
        notebook: formData.notebook,
        professor: formData.professor,
        turma: formData.turma,
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
      <form onSubmit={handleSubmit} className="space-y-5">
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
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Selecione um notebook</option>

            {notebooks.map((notebook) => (
              <option key={notebook.id} value={notebook.id}>
                {notebook.nome || notebook.numero || notebook.id}
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

          {professores.length > 0 ? (
            <select
              id="professor"
              name="professor"
              value={formData.professor}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Selecione um professor</option>

              {professores.map((professor) => (
                <option
                  key={professor.id}
                  value={professor.nome}
                >
                  {professor.nome}
                </option>
              ))}
            </select>
          ) : (
            <input
              id="professor"
              name="professor"
              type="text"
              value={formData.professor}
              onChange={handleChange}
              placeholder="Nome do professor"
              disabled={isLoading}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          )}
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
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
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
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
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
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
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
            placeholder="Observações..."
            disabled={isLoading}
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Mensagem de erro */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-700">
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
            className="flex-1 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
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