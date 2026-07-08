// Funções utilitárias serão adicionadas aqui
// Exemplo: formatDate, formatCurrency, validators, etc.

export function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-BR');
}

export function formatTime(date) {
  return new Date(date).toLocaleTimeString('pt-BR');
}
