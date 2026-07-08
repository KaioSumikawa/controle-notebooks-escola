/**
 * Validadores de dados
 * Funções reutilizáveis para validação em toda a aplicação
 */

import { VALIDATION_RULES, MESSAGES } from './constants.js';

/**
 * Valida se um campo é obrigatório
 * @param {string} value - Valor a validar
 * @param {string} fieldName - Nome do campo (para mensagem)
 * @returns {object} { isValid: boolean, error: string }
 */
export const validateRequired = (value, fieldName = 'Campo') => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return {
      isValid: false,
      error: `${fieldName} é obrigatório`,
    };
  }
  return { isValid: true, error: null };
};

/**
 * Valida comprimento mínimo de string
 * @param {string} value - Valor a validar
 * @param {number} minLength - Comprimento mínimo
 * @returns {object} { isValid: boolean, error: string }
 */
export const validateMinLength = (value, minLength = 2) => {
  if (value && value.length < minLength) {
    return {
      isValid: false,
      error: `Mínimo de ${minLength} caracteres`,
    };
  }
  return { isValid: true, error: null };
};

/**
 * Valida comprimento máximo de string
 * @param {string} value - Valor a validar
 * @param {number} maxLength - Comprimento máximo
 * @returns {object} { isValid: boolean, error: string }
 */
export const validateMaxLength = (value, maxLength = 100) => {
  if (value && value.length > maxLength) {
    return {
      isValid: false,
      error: `Máximo de ${maxLength} caracteres`,
    };
  }
  return { isValid: true, error: null };
};

/**
 * Valida formato de e-mail
 * @param {string} email - E-mail a validar
 * @returns {object} { isValid: boolean, error: string }
 */
export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, error: 'E-mail é obrigatório' };
  }

  if (!VALIDATION_RULES.EMAIL_PATTERN.test(email)) {
    return { isValid: false, error: 'E-mail inválido' };
  }

  return { isValid: true, error: null };
};

/**
 * Valida formato de telefone
 * @param {string} phone - Telefone a validar
 * @returns {object} { isValid: boolean, error: string }
 */
export const validatePhone = (phone) => {
  if (!phone) {
    return { isValid: true, error: null }; // Opcional
  }

  if (!VALIDATION_RULES.PHONE_PATTERN.test(phone)) {
    return { isValid: false, error: 'Telefone inválido' };
  }

  return { isValid: true, error: null };
};

/**
 * Valida nome (texto básico)
 * @param {string} name - Nome a validar
 * @returns {object} { isValid: boolean, error: string }
 */
export const validateName = (name) => {
  const required = validateRequired(name, 'Nome');
  if (!required.isValid) return required;

  const minLength = validateMinLength(name, VALIDATION_RULES.NAME_MIN_LENGTH);
  if (!minLength.isValid) return minLength;

  const maxLength = validateMaxLength(name, VALIDATION_RULES.NAME_MAX_LENGTH);
  if (!maxLength.isValid) return maxLength;

  return { isValid: true, error: null };
};

/**
 * Valida múltiplos campos
 * @param {object} data - Dados a validar { fieldName: value }
 * @param {object} rules - Regras de validação { fieldName: validatorFunctions }
 * @returns {object} { isValid: boolean, errors: object }
 */
export const validateMultiple = (data, rules) => {
  const errors = {};
  let isValid = true;

  Object.entries(rules).forEach(([fieldName, validators]) => {
    const value = data[fieldName];

    // Se validators é uma função, executa
    if (typeof validators === 'function') {
      const result = validators(value);
      if (!result.isValid) {
        errors[fieldName] = result.error;
        isValid = false;
      }
    }
    // Se validators é um array, executa todas
    else if (Array.isArray(validators)) {
      for (const validator of validators) {
        const result = validator(value);
        if (!result.isValid) {
          errors[fieldName] = result.error;
          isValid = false;
          break; // Para no primeiro erro
        }
      }
    }
  });

  return { isValid, errors };
};

/**
 * Valida se é um UUID válido
 * @param {string} uuid - UUID a validar
 * @returns {boolean}
 */
export const validateUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

/**
 * Valida se é um número
 * @param {any} value - Valor a validar
 * @returns {object} { isValid: boolean, error: string }
 */
export const validateNumber = (value) => {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Campo obrigatório' };
  }

  if (isNaN(value) || !Number.isFinite(value)) {
    return { isValid: false, error: 'Deve ser um número válido' };
  }

  return { isValid: true, error: null };
};

/**
 * Valida se é um inteiro positivo
 * @param {any} value - Valor a validar
 * @returns {object} { isValid: boolean, error: string }
 */
export const validatePositiveInteger = (value) => {
  const numberValidation = validateNumber(value);
  if (!numberValidation.isValid) return numberValidation;

  if (!Number.isInteger(value) || value <= 0) {
    return { isValid: false, error: 'Deve ser um inteiro positivo' };
  }

  return { isValid: true, error: null };
};

/**
 * Valida data
 * @param {string|Date} date - Data a validar
 * @returns {object} { isValid: boolean, error: string }
 */
export const validateDate = (date) => {
  if (!date) {
    return { isValid: false, error: 'Data é obrigatória' };
  }

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return { isValid: false, error: 'Data inválida' };
  }

  return { isValid: true, error: null };
};

/**
 * Valida se data é após outra
 * @param {string|Date} dateToValidate - Data a validar
 * @param {string|Date} minDate - Data mínima
 * @returns {object} { isValid: boolean, error: string }
 */
export const validateDateAfter = (dateToValidate, minDate) => {
  const dateValidation = validateDate(dateToValidate);
  if (!dateValidation.isValid) return dateValidation;

  const date1 = new Date(dateToValidate);
  const date2 = new Date(minDate);

  if (date1 <= date2) {
    return {
      isValid: false,
      error: 'A data deve ser após a data inicial',
    };
  }

  return { isValid: true, error: null };
};

/**
 * Valida arquivo
 * @param {File} file - Arquivo a validar
 * @param {object} options - Opções { maxSize, allowedTypes }
 * @returns {object} { isValid: boolean, error: string }
 */
export const validateFile = (file, options = {}) => {
  const { maxSize = 5 * 1024 * 1024, allowedTypes = [] } = options;

  if (!file) {
    return { isValid: false, error: 'Arquivo é obrigatório' };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `Arquivo muito grande (máximo ${(maxSize / 1024 / 1024).toFixed(2)}MB)`,
    };
  }

  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `Tipo de arquivo não permitido. Tipos aceitos: ${allowedTypes.join(', ')}`,
    };
  }

  return { isValid: true, error: null };
};

/**
 * Valida padrão customizado com regex
 * @param {string} value - Valor a validar
 * @param {RegExp} pattern - Padrão regex
 * @param {string} errorMessage - Mensagem de erro customizada
 * @returns {object} { isValid: boolean, error: string }
 */
export const validatePattern = (value, pattern, errorMessage = 'Formato inválido') => {
  if (!value) {
    return { isValid: false, error: 'Campo obrigatório' };
  }

  if (!pattern.test(value)) {
    return { isValid: false, error: errorMessage };
  }

  return { isValid: true, error: null };
};
