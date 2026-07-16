/**
 * Cores padronizadas do sistema
 */

export const STATUS_COLORS = {
  disponivel: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-200',
    icon: 'text-green-600',
  },

  emprestado: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-200',
    icon: 'text-blue-600',
  },

  manutencao: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
    icon: 'text-yellow-600',
  },

  ativo: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-200',
    icon: 'text-blue-600',
  },

  finalizado: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-200',
    icon: 'text-green-600',
  },

  atrasado: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    border: 'border-red-200',
    icon: 'text-red-600',
  },

  cancelado: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-200',
    icon: 'text-gray-600',
  },

  inativo: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-200',
    icon: 'text-gray-600',
  },

  default: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-200',
    icon: 'text-gray-600',
  },
};

/**
 * Cores dos cards do Dashboard
 */
export const DASHBOARD_COLORS = {
  primary: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    icon: 'text-blue-600',
    border: 'border-blue-200',
  },

  success: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    icon: 'text-green-600',
    border: 'border-green-200',
  },

  warning: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    icon: 'text-yellow-600',
    border: 'border-yellow-200',
  },

  danger: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    icon: 'text-red-600',
    border: 'border-red-200',
  },

  secondary: {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    icon: 'text-gray-600',
    border: 'border-gray-200',
  },
};

/**
 * Retorna as cores de um status.
 */
export function getStatusColors(status) {
  return STATUS_COLORS[status] ?? STATUS_COLORS.default;
}

/**
 * Retorna as cores de um card do dashboard.
 */
export function getDashboardColors(variant = 'primary') {
  return DASHBOARD_COLORS[variant] ?? DASHBOARD_COLORS.primary;
}