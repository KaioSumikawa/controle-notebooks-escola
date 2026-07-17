import { useEffect, useState } from 'react';
import { Calendar, BookOpen, User, Laptop } from 'lucide-react';
import { Modal } from './Modal';

const getToday = () => new Date().toISOString().split('T')[0];

const createInitialState = () => ({
  notebook: '',
  professor: '',
  turma: '',
  dataEmprestimo: getToday(),
  observacao: '',
});

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

  const inputClass = `
    w-full
    rounded-xl
    border
    border-slate-200
    bg-slate-50
    px-4
    py-3
    text-sm
    transition-all
    duration-200
    focus:bg-white
    focus:border-blue-500
    focus:ring-4
    focus:ring-blue-100
    focus:outline-none
  `;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={emprestimo ? 'Editar Empréstimo' : 'Novo Empréstimo'}
      size="lg"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Notebook */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Laptop size={16} />
              Notebook
            </label>

            <select
              name="notebook"
              value={formData.notebook}
              onChange={handleChange}
              disabled={isLoading}
              className={inputClass}
            >
              <option value="">Selecione um notebook</option>

              {notebooks.map((notebook) => (
                <option
                  key={notebook.id}
                  value={notebook.id}
                >
                  {notebook.nome || notebook.numero || notebook.id}
                </option>
              ))}
            </select>
          </div>

          {/* Data */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Calendar size={16} />
              Data
            </label>

            <input
              type="date"
              name="dataEmprestimo"
              value={formData.dataEmprestimo}
              onChange={handleChange}
              disabled={isLoading}
              className={inputClass}
            />
          </div>

          {/* Professor */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <User size={16} />
              Professor
            </label>

            {professores.length > 0 ? (
              <select
                name="professor"
                value={formData.professor}
                onChange={handleChange}
                disabled={isLoading}
                className={inputClass}
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
                type="text"
                name="professor"
                value={formData.professor}
                onChange={handleChange}
                placeholder="Nome do professor"
                disabled={isLoading}
                className={inputClass}
              />
            )}
          </div>

          {/* Turma */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <BookOpen size={16} />
              Turma
            </label>

            {turmas.length > 0 ? (
              <select
                name="turma"
                value={formData.turma}
                onChange={handleChange}
                disabled={isLoading}
                className={inputClass}
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
                type="text"
                name="turma"
                value={formData.turma}
                onChange={handleChange}
                placeholder="Ex: 3º Ano A"
                disabled={isLoading}
                className={inputClass}
              />
            )}
          </div>

        </div>

        {/* Observação */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Observação
          </label>

          <textarea
            rows={4}
            name="observacao"
            value={formData.observacao}
            onChange={handleChange}
            placeholder="Digite alguma observação..."
            disabled={isLoading}
            className={`${inputClass} resize-none`}
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-700">
              {error}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2 border-t border-slate-200">
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="
              rounded-xl
              border
              border-slate-200
              bg-white
              px-5
              py-3
              font-medium
              text-slate-700
              transition
              hover:bg-slate-100
            "
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              px-6
              py-3
              font-semibold
              text-white
              shadow-lg
              transition-all
              hover:scale-[1.02]
              hover:shadow-xl
            "
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