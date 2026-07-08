/**
 * Formatadores de dados
 * Funções para formatar e transformar dados para exibição
 */

/**
 * Formata data para padrão brasileiro
 * @param {string|Date} date - Data a formatar
 * @param {string} format - Formato desejado (default: 'DD/MM/YYYY')
 * @returns {string}
 */
export const formatDate = (date, format = 'DD/MM/YYYY') => {
  if (!date) return '-';

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return '-';

  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getSeconds()).padStart(2, '0');

  const formats = {
    'DD/MM/YYYY': `${day}/${month}/${year}`,
    'DD/MM/YYYY HH:MM': `${day}/${month}/${year} ${hours}:${minutes}`,
    'DD/MM/YYYY HH:MM:SS': `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`,
    'YYYY-MM-DD': `${year}-${month}-${day}`,
    'HH:MM': `${hours}:${minutes}`,
    'HH:MM:SS': `${hours}:${minutes}:${seconds}`,
  };

  return formats[format] || formats['DD/MM/YYYY'];
};

/**
 * Formata data relativa (ex: "há 2 horas")
 * @param {string|Date} date - Data a formatar
 * @returns {string}
 */
export const formatRelativeDate = (date) => {
  if (!date) return '-';

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return '-';

  const now = new Date();
  const diffMs = now - dateObj;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'agora';
  if (diffMins < 60) return `há ${diffMins} min`;
  if (diffHours < 24) return `há ${diffHours}h`;
  if (diffDays < 7) return `há ${diffDays}d`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `há ${weeks}s`;
  }
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `há ${months}m`;
  }

  const years = Math.floor(diffDays / 365);
  return `há ${years}a`;
};

/**
 * Formata moeda brasileira
 * @param {number} value - Valor a formatar
 * @returns {string}
 */
export const formatCurrency = (value) => {
  if (!value && value !== 0) return 'R$ 0,00';

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Formata percentual
 * @param {number} value - Valor entre 0 e 100
 * @param {number} decimals - Número de casas decimais
 * @returns {string}
 */
export const formatPercentage = (value, decimals = 0) => {
  if (!value && value !== 0) return '-';

  return `${Number(value).toFixed(decimals)}%`;
};

/**
 * Formata número com separador de milhares
 * @param {number} value - Número a formatar
 * @param {number} decimals - Número de casas decimais
 * @returns {string}
 */
export const formatNumber = (value, decimals = 0) => {
  if (!value && value !== 0) return '-';

  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

/**
 * Formata tamanho de arquivo
 * @param {number} bytes - Tamanho em bytes
 * @returns {string}
 */
export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};

/**
 * Formata string para maiúsculas apenas primeira letra
 * @param {string} str - String a formatar
 * @returns {string}
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Formata string para Title Case
 * @param {string} str - String a formatar
 * @returns {string}
 */
export const toTitleCase = (str) => {
  if (!str) return '';
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

/**
 * Remove acentos de string
 * @param {string} str - String a formatar
 * @returns {string}
 */
export const removeAccents = (str) => {
  if (!str) return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

/**
 * Formata telefone
 * @param {string} phone - Telefone a formatar
 * @returns {string}
 */
export const formatPhone = (phone) => {
  if (!phone) return '-';

  // Remove tudo que não é número
  const cleaned = phone.replace(/\D/g, '');

  // Formata como (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
  if (cleaned.length === 11) {
    return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7)}`;
  }
  if (cleaned.length === 10) {
    return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 6)}-${cleaned.substring(6)}`;
  }

  return phone;
};

/**
 * Formata CEP
 * @param {string} cep - CEP a formatar
 * @returns {string}
 */
export const formatCEP = (cep) => {
  if (!cep) return '-';

  const cleaned = cep.replace(/\D/g, '');
  if (cleaned.length !== 8) return cep;

  return `${cleaned.substring(0, 5)}-${cleaned.substring(5)}`;
};

/**
 * Formata CPF
 * @param {string} cpf - CPF a formatar
 * @returns {string}
 */
export const formatCPF = (cpf) => {
  if (!cpf) return '-';

  const cleaned = cpf.replace(/\D/g, '');
  if (cleaned.length !== 11) return cpf;

  return `${cleaned.substring(0, 3)}.${cleaned.substring(3, 6)}.${cleaned.substring(6, 9)}-${cleaned.substring(9)}`;
};

/**
 * Trunca texto com reticências
 * @param {string} text - Texto a truncar
 * @param {number} length - Comprimento máximo
 * @returns {string}
 */
export const truncate = (text, length = 50) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return `${text.substring(0, length)}...`;
};

/**
 * Formata slug a partir de texto
 * @param {string} text - Texto a converter
 * @returns {string}
 */
export const toSlug = (text) => {
  if (!text) return '';

  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Formata bytes para velocidade de internet
 * @param {number} bytes - Bytes por segundo
 * @returns {string}
 */
export const formatSpeed = (bytes) => {
  if (!bytes || bytes === 0) return '0 B/s';

  const k = 1024;
  const sizes = ['B/s', 'KB/s', 'MB/s', 'GB/s'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};

/**
 * Formata duração em texto legível
 * @param {number} milliseconds - Duração em milissegundos
 * @returns {string}
 */
export const formatDuration = (milliseconds) => {
  if (!milliseconds || milliseconds < 0) return '-';

  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
};

/**
 * Formata objeto para JSON legível
 * @param {object} obj - Objeto a formatar
 * @returns {string}
 */
export const formatJSON = (obj) => {
  try {
    return JSON.stringify(obj, null, 2);
  } catch (error) {
    return '-';
  }
};

/**
 * Formata array como string separada por vírgula
 * @param {array} arr - Array a formatar
 * @param {string} separator - Separador (default: ', ')
 * @returns {string}
 */
export const formatArray = (arr, separator = ', ') => {
  if (!Array.isArray(arr) || arr.length === 0) return '-';
  return arr.join(separator);
};
