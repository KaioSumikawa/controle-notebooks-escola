import { useEffect, useState } from 'react';
import { Modal } from './Modal';

const initialFormData = {
  nome: '',
  matricula: '',
  email: '',
  telefone: '',
  disciplina: '',
};

/**
 * Modal para criar/editar professores
 */
export function ProfessorModal({
  isOpen = false,
  professor = null,
  isLoading = false,
  onSave,
  onClose,
}) {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    if (professor) {
      setFormData({
        nome: professor.nome ?? '',
        matricula: professor.matricula ?? '',
        email: professor.email ?? '',
        telefone: professor.telefone ?? '',
        disciplina: professor.disciplina ?? '',
      });
    } else {
      setFormData(initialFormData);
    }

    setError('');
  }, [isOpen, professor]);

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
      setError('O nome do professor é obrigatório.');
      return;
    }

    try {
      await onSave?.({
        nome: formData.nome.trim(),
        matricula: formData.matricula.trim(),
        email: formData.email.trim(),
        telefone: formData.telefone.trim(),
        disciplina: formData.disciplina.trim(),
      });

      handleClose();
    } catch (err) {
      setError(err?.message || 'Erro ao salvar professor.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={professor ? 'Editar Professor' : 'Novo Professor'}
      size="md"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Nome */}
        <div>
          <label
            htmlFor="professor-nome"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Nome do Professor *
          </label>

          <input
            id="professor-nome"
            name="nome"
            type="text"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Ex: Carlos Silva"
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

        {/* Matrícula */}
        <div>
          <label
            htmlFor="professor-matricula"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Matrícula
          </label>

          <input
            id="professor-matricula"
            name="matricula"
            type="text"
            value={formData.matricula}
            onChange={handleChange}
            placeholder="Ex: 123456"
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

        {/* E-mail */}
        <div>
          <label
            htmlFor="professor-email"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            E-mail
          </label>

          <input
            id="professor-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ex: professor@escola.com"
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

        {/* Telefone */}
        <div>
          <label
            htmlFor="professor-telefone"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Telefone
          </label>

          <input
            id="professor-telefone"
            name="telefone"
            type="text"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="Ex: (13) 99999-9999"
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

        {/* Disciplina */}
        <div>
          <label
            htmlFor="professor-disciplina"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Disciplina
          </label>

          <input
            id="professor-disciplina"
            name="disciplina"
            type="text"
            value={formData.disciplina}
            onChange={handleChange}
            placeholder="Ex: Matemática"
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
              : professor
                ? 'Atualizar'
                : 'Cadastrar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}