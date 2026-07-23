const variants = {
  disponivel: {
    container: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    dot: 'bg-emerald-500',
  },

  emprestado: {
    container: 'bg-blue-50 border-blue-200 text-blue-700',
    dot: 'bg-blue-500',
  },

  manutencao: {
    container: 'bg-amber-50 border-amber-200 text-amber-700',
    dot: 'bg-amber-500',
  },

  danificado: {
    container: 'bg-red-50 border-red-200 text-red-700',
    dot: 'bg-red-500',
  },

  ativo: {
    container: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    dot: 'bg-emerald-500',
  },

  inativo: {
    container: 'bg-slate-100 border-slate-200 text-slate-700',
    dot: 'bg-slate-500',
  },

  pendente: {
    container: 'bg-orange-50 border-orange-200 text-orange-700',
    dot: 'bg-orange-500',
  },

  devolvido: {
    container: 'bg-green-50 border-green-200 text-green-700',
    dot: 'bg-green-500',
  },

  atrasado: {
    container: 'bg-red-50 border-red-200 text-red-700',
    dot: 'bg-red-500',
  },

  default: {
    container: 'bg-slate-100 border-slate-200 text-slate-700',
    dot: 'bg-slate-500',
  },
};


export function StatusBadge({ status = '' }) {
  const normalizedStatus = String(status)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  const style = variants[normalizedStatus] || variants.default;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        px-3
        py-1.5
        text-xs
        font-semibold
        ${style.container}
      `}
    >
      <span
        className={`
          h-2
          w-2
          rounded-full
          ${style.dot}
        `}
      />

      {status || 'Sem status'}
    </span>
  );
}

export default StatusBadge;