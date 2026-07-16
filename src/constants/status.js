/**
 * Status utilizados em todo o sistema
 */

export const NOTEBOOK_STATUS = {
  DISPONIVEL: 'disponivel',
  EMPRESTADO: 'emprestado',
  MANUTENCAO: 'manutencao',
  INATIVO: 'inativo',
};

export const EMPRESTIMO_STATUS = {
  ATIVO: 'ativo',
  FINALIZADO: 'finalizado',
  ATRASADO: 'atrasado',
  CANCELADO: 'cancelado',
};

export const PROFESSOR_STATUS = {
  ATIVO: 'ativo',
  INATIVO: 'inativo',
};

/**
 * Labels amigáveis
 */
export const STATUS_LABELS = {
  [NOTEBOOK_STATUS.DISPONIVEL]: 'Disponível',
  [NOTEBOOK_STATUS.EMPRESTADO]: 'Emprestado',
  [NOTEBOOK_STATUS.MANUTENCAO]: 'Manutenção',
  [NOTEBOOK_STATUS.INATIVO]: 'Inativo',

  [EMPRESTIMO_STATUS.ATIVO]: 'Ativo',
  [EMPRESTIMO_STATUS.FINALIZADO]: 'Finalizado',
  [EMPRESTIMO_STATUS.ATRASADO]: 'Atrasado',
  [EMPRESTIMO_STATUS.CANCELADO]: 'Cancelado',
};

/**
 * Retorna o texto amigável de um status.
 */
export function getStatusLabel(status) {
  return STATUS_LABELS[status] ?? status;
}

/**
 * Verifica se um notebook está disponível.
 */
export function notebookDisponivel(status) {
  return status === NOTEBOOK_STATUS.DISPONIVEL;
}

/**
 * Verifica se um empréstimo está ativo.
 */
export function emprestimoAtivo(status) {
  return status === EMPRESTIMO_STATUS.ATIVO;
}