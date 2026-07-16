/**
 * Formata uma data para o padrão brasileiro (dd/MM/yyyy)
 * Aceita Date, ISO String ou qualquer valor compatível com new Date().
 */

export function formatDate(date) {
  if (!date) {
    return '-';
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return '-';
  }

  return parsedDate.toLocaleDateString('pt-BR');
}

/**
 * Formata uma data incluindo hora.
 * Ex: 17/07/2026 14:35
 */
export function formatDateTime(date) {
  if (!date) {
    return '-';
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return '-';
  }

  return parsedDate.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Retorna somente a data de hoje
 * no formato yyyy-MM-dd.
 */
export function getToday() {
  const hoje = new Date();

  return hoje.toISOString().split('T')[0];
}

/**
 * Converte uma data ISO para o formato
 * aceito por inputs type="date".
 */
export function toInputDate(date) {
  if (!date) {
    return '';
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return '';
  }

  return parsedDate.toISOString().split('T')[0];
}