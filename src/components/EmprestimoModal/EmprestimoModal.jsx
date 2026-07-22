import { useEffect, useState } from 'react';

import {
  X,
  ClipboardList,
  UserRound,
  Users,
  Laptop,
  CalendarDays,
  Clock,
} from 'lucide-react';

const initialFormData = {
  professor: '',
  turma: '',
  notebookId: '',
  dataEmprestimo: '',
  horaEmprestimo: '',
};

export function EmprestimoModal({
  isOpen,
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState(initialFormData);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const agora = new Date();

      const dataAtual = agora
        .toISOString()
        .split('T')[0];

      const horaAtual = agora
        .toTimeString()
        .slice(0, 5);

      setFormData({
        ...initialFormData,
        dataEmprestimo: dataAtual,
        horaEmprestimo: horaAtual,
      });

      setIsSaving(false);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSaving(true);

      await onSave({
        ...formData,
        status: 'ativo',
      });

      setFormData(initialFormData);
    } catch (error) {
      console.error(
        'Erro ao criar empréstimo:',
        error
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-slate-900/40
        p-4
        backdrop-blur-sm
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="
          max-h-[90vh]
          w-full
          max-w-2xl
          overflow-y-auto
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-2xl
        "
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <ClipboardList
                size={20}
                strokeWidth={2}
                className="text-blue-600"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Novo empréstimo
              </h2>

              <p className="mt-0.5 text-sm text-slate-500">
                Registre a retirada de um notebook.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            title="Fechar"
            aria-label="Fechar modal"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:ring-offset-2
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

            {/* Professor */}
            <div className="md:col-span-2">
              <label
                htmlFor="professor"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Professor
              </label>

              <div className="relative">
                <UserRound
                  size={18}
                  strokeWidth={1.8}
                  className="
                    pointer-events-none
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  id="professor"
                  name="professor"
                  type="text"
                  value={formData.professor}
                  onChange={handleChange}
                  placeholder="Nome do professor"
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    py-3
                    pl-10
                    pr-4
                    text-sm
                    text-slate-900
                    outline-none
                    transition
                    placeholder:text-slate-400
                    hover:border-slate-300
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-500/10
                  "
                />
              </div>
            </div>

            {/* Turma */}
            <div>
              <label
                htmlFor="turma"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Turma
              </label>

              <div className="relative">
                <Users
                  size={18}
                  strokeWidth={1.8}
                  className="
                    pointer-events-none
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  id="turma"
                  name="turma"
                  type="text"
                  value={formData.turma}
                  onChange={handleChange}
                  placeholder="Ex.: 2º A"
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    py-3
                    pl-10
                    pr-4
                    text-sm
                    text-slate-900
                    outline-none
                    transition
                    placeholder:text-slate-400
                    hover:border-slate-300
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-500/10
                  "
                />
              </div>
            </div>

            {/* Notebook */}
            <div>
              <label
                htmlFor="notebookId"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Notebook
              </label>

              <div className="relative">
                <Laptop
                  size={18}
                  strokeWidth={1.8}
                  className="
                    pointer-events-none
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  id="notebookId"
                  name="notebookId"
                  type="text"
                  value={formData.notebookId}
                  onChange={handleChange}
                  placeholder="Ex.: Notebook 01"
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    py-3
                    pl-10
                    pr-4
                    text-sm
                    text-slate-900
                    outline-none
                    transition
                    placeholder:text-slate-400
                    hover:border-slate-300
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-500/10
                  "
                />
              </div>
            </div>

            {/* Data */}
            <div>
              <label
                htmlFor="dataEmprestimo"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Data do empréstimo
              </label>

              <div className="relative">
                <CalendarDays
                  size={18}
                  strokeWidth={1.8}
                  className="
                    pointer-events-none
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  id="dataEmprestimo"
                  name="dataEmprestimo"
                  type="date"
                  value={formData.dataEmprestimo}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    py-3
                    pl-10
                    pr-4
                    text-sm
                    text-slate-900
                    outline-none
                    transition
                    hover:border-slate-300
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-500/10
                  "
                />
              </div>
            </div>

            {/* Horário */}
            <div>
              <label
                htmlFor="horaEmprestimo"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Horário
              </label>

              <div className="relative">
                <Clock
                  size={18}
                  strokeWidth={1.8}
                  className="
                    pointer-events-none
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  id="horaEmprestimo"
                  name="horaEmprestimo"
                  type="time"
                  value={formData.horaEmprestimo}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    py-3
                    pl-10
                    pr-4
                    text-sm
                    text-slate-900
                    outline-none
                    transition
                    hover:border-slate-300
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-500/10
                  "
                />
              </div>
            </div>
          </div>

          {/* Rodapé */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-2.5
                text-sm
                font-medium
                text-slate-600
                transition
                hover:bg-slate-50
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="
                rounded-xl
                bg-blue-600
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-blue-700
                focus:outline-none
                focus:ring-4
                focus:ring-blue-500/20
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {isSaving
                ? 'Salvando...'
                : 'Registrar empréstimo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}