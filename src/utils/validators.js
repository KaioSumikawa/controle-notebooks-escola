/**
 * Validações reutilizáveis da aplicação
 */

const EMAIL_PATTERN =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PHONE_PATTERN =
  /^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/;

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const validateRequired = (
  value,
  fieldName = 'Campo'
) => {
  if (
    value === null ||
    value === undefined ||
    (typeof value === 'string' &&
      value.trim() === '')
  ) {
    return {
      isValid: false,
      error: `${fieldName} é obrigatório.`,
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

export const validateMinLength = (
  value,
  minLength = 2
) => {
  if (
    value &&
    value.trim().length < minLength
  ) {
    return {
      isValid: false,
      error: `Mínimo de ${minLength} caracteres.`,
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

export const validateMaxLength = (
  value,
  maxLength = 100
) => {
  if (
    value &&
    value.trim().length > maxLength
  ) {
    return {
      isValid: false,
      error: `Máximo de ${maxLength} caracteres.`,
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

export const validateEmail = (
  email
) => {
  const required =
    validateRequired(email, 'E-mail');

  if (!required.isValid) {
    return required;
  }

  if (!EMAIL_PATTERN.test(email)) {
    return {
      isValid: false,
      error: 'E-mail inválido.',
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

export const validatePhone = (
  phone
) => {
  if (!phone) {
    return {
      isValid: true,
      error: null,
    };
  }

  if (!PHONE_PATTERN.test(phone)) {
    return {
      isValid: false,
      error: 'Telefone inválido.',
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

export const validateName = (
  name
) => {
  const required =
    validateRequired(name, 'Nome');

  if (!required.isValid) {
    return required;
  }

  const min =
    validateMinLength(name, 2);

  if (!min.isValid) {
    return min;
  }

  const max =
    validateMaxLength(name, 100);

  if (!max.isValid) {
    return max;
  }

  return {
    isValid: true,
    error: null,
  };
};

export const validateNumber = (
  value
) => {
  if (
    value === '' ||
    value === null ||
    value === undefined
  ) {
    return {
      isValid: false,
      error: 'Campo obrigatório.',
    };
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    return {
      isValid: false,
      error: 'Número inválido.',
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

export const validatePositiveInteger = (
  value
) => {
  const result =
    validateNumber(value);

  if (!result.isValid) {
    return result;
  }

  const number = Number(value);

  if (
    !Number.isInteger(number) ||
    number <= 0
  ) {
    return {
      isValid: false,
      error:
        'Informe um número inteiro positivo.',
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

export const validateDate = (
  date
) => {
  if (!date) {
    return {
      isValid: false,
      error: 'Data obrigatória.',
    };
  }

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return {
      isValid: false,
      error: 'Data inválida.',
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

export const validateDateAfter = (
  currentDate,
  minDate
) => {
  const validation =
    validateDate(currentDate);

  if (!validation.isValid) {
    return validation;
  }

  if (
    new Date(currentDate) <=
    new Date(minDate)
  ) {
    return {
      isValid: false,
      error:
        'A data deve ser posterior.',
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

export const validateUUID = (
  uuid
) => {
  return UUID_PATTERN.test(uuid);
};

export const validatePattern = (
  value,
  pattern,
  errorMessage = 'Formato inválido.'
) => {
  const required =
    validateRequired(value);

  if (!required.isValid) {
    return required;
  }

  if (!pattern.test(value)) {
    return {
      isValid: false,
      error: errorMessage,
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

export const validateFile = (
  file,
  options = {}
) => {
  const {
    maxSize = 5 * 1024 * 1024,
    allowedTypes = [],
  } = options;

  if (!file) {
    return {
      isValid: false,
      error: 'Selecione um arquivo.',
    };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `Arquivo maior que ${(maxSize / 1024 / 1024).toFixed(1)} MB.`,
    };
  }

  if (
    allowedTypes.length &&
    !allowedTypes.includes(file.type)
  ) {
    return {
      isValid: false,
      error:
        'Tipo de arquivo não permitido.',
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

export const validateMultiple = (
  data,
  rules
) => {
  const errors = {};

  Object.entries(rules).forEach(
    ([field, validators]) => {
      const lista = Array.isArray(
        validators
      )
        ? validators
        : [validators];

      for (const validator of lista) {
        const result = validator(
          data[field]
        );

        if (!result.isValid) {
          errors[field] = result.error;
          break;
        }
      }
    }
  );

  return {
    isValid:
      Object.keys(errors).length === 0,
    errors,
  };
};