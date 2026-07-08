/**
 * Sistema de Permissões baseado em Roles
 * Define e gerencia permissões por tipo de usuário
 */

import { USER_TYPE } from './constants.js';

/**
 * Define as permissões de cada role
 */
const ROLE_PERMISSIONS = {
  [USER_TYPE.ADMIN]: {
    // Turmas
    turmas: {
      view: true,
      create: true,
      edit: true,
      delete: true,
    },
    // Alunos
    alunos: {
      view: true,
      create: true,
      edit: true,
      delete: true,
    },
    // Notebooks
    notebooks: {
      view: true,
      create: true,
      edit: true,
      delete: true,
    },
    // Empréstimos
    emprestimos: {
      view: true,
      create: true,
      edit: true,
      delete: true,
      finish: true,
    },
    // Usuários
    usuarios: {
      view: true,
      create: true,
      edit: true,
      delete: true,
    },
    // Relatórios
    relatorios: {
      view: true,
      export: true,
    },
    // Configurações
    configuracoes: {
      view: true,
      edit: true,
    },
  },

  [USER_TYPE.PROFESSOR]: {
    // Turmas (apenas visualização)
    turmas: {
      view: true,
      create: false,
      edit: false,
      delete: false,
    },
    // Alunos (visualização)
    alunos: {
      view: true,
      create: false,
      edit: false,
      delete: false,
    },
    // Notebooks (visualização)
    notebooks: {
      view: true,
      create: false,
      edit: false,
      delete: false,
    },
    // Empréstimos (completo para seus alunos)
    emprestimos: {
      view: true,
      create: true,
      edit: false,
      delete: false,
      finish: true,
    },
    // Usuários (não pode acessar)
    usuarios: {
      view: false,
      create: false,
      edit: false,
      delete: false,
    },
    // Relatórios (visualização apenas)
    relatorios: {
      view: true,
      export: false,
    },
    // Configurações (não pode acessar)
    configuracoes: {
      view: false,
      edit: false,
    },
  },

  [USER_TYPE.COORDENADOR]: {
    // Turmas
    turmas: {
      view: true,
      create: true,
      edit: true,
      delete: false,
    },
    // Alunos
    alunos: {
      view: true,
      create: true,
      edit: true,
      delete: false,
    },
    // Notebooks
    notebooks: {
      view: true,
      create: true,
      edit: true,
      delete: false,
    },
    // Empréstimos
    emprestimos: {
      view: true,
      create: true,
      edit: true,
      delete: false,
      finish: true,
    },
    // Usuários (visualização apenas)
    usuarios: {
      view: true,
      create: false,
      edit: false,
      delete: false,
    },
    // Relatórios
    relatorios: {
      view: true,
      export: true,
    },
    // Configurações (visualização apenas)
    configuracoes: {
      view: true,
      edit: false,
    },
  },
};

/**
 * Verifica se um usuário tem permissão para uma ação em um recurso
 * @param {string} userRole - Tipo de usuário (admin, professor, coordenador)
 * @param {string} resource - Recurso (turmas, alunos, notebooks, etc)
 * @param {string} action - Ação (view, create, edit, delete, etc)
 * @returns {boolean}
 */
export const hasPermission = (userRole, resource, action) => {
  if (!userRole || !resource || !action) return false;

  const rolePerms = ROLE_PERMISSIONS[userRole];
  if (!rolePerms) return false;

  const resourcePerms = rolePerms[resource];
  if (!resourcePerms) return false;

  return resourcePerms[action] === true;
};

/**
 * Verifica múltiplas permissões (AND logic - todas devem ser true)
 * @param {string} userRole - Tipo de usuário
 * @param {array} permissions - Array de [resource, action]
 * @returns {boolean}
 */
export const hasAllPermissions = (userRole, permissions) => {
  return permissions.every(([resource, action]) =>
    hasPermission(userRole, resource, action)
  );
};

/**
 * Verifica múltiplas permissões (OR logic - uma deve ser true)
 * @param {string} userRole - Tipo de usuário
 * @param {array} permissions - Array de [resource, action]
 * @returns {boolean}
 */
export const hasAnyPermission = (userRole, permissions) => {
  return permissions.some(([resource, action]) =>
    hasPermission(userRole, resource, action)
  );
};

/**
 * Retorna todas as permissões de um usuário
 * @param {string} userRole - Tipo de usuário
 * @returns {object}
 */
export const getUserPermissions = (userRole) => {
  return ROLE_PERMISSIONS[userRole] || {};
};

/**
 * Retorna os recursos que um usuário pode visualizar
 * @param {string} userRole - Tipo de usuário
 * @returns {array}
 */
export const getAccessibleResources = (userRole) => {
  const perms = getUserPermissions(userRole);
  return Object.keys(perms).filter(
    (resource) => perms[resource].view === true
  );
};

/**
 * Retorna as ações que um usuário pode fazer em um recurso
 * @param {string} userRole - Tipo de usuário
 * @param {string} resource - Recurso
 * @returns {array}
 */
export const getAvailableActions = (userRole, resource) => {
  const perms = getUserPermissions(userRole);
  const resourcePerms = perms[resource];

  if (!resourcePerms) return [];

  return Object.keys(resourcePerms).filter(
    (action) => resourcePerms[action] === true
  );
};

/**
 * Verifica se usuário é admin
 * @param {string} userRole - Tipo de usuário
 * @returns {boolean}
 */
export const isAdmin = (userRole) => {
  return userRole === USER_TYPE.ADMIN;
};

/**
 * Verifica se usuário é professor
 * @param {string} userRole - Tipo de usuário
 * @returns {boolean}
 */
export const isTeacher = (userRole) => {
  return userRole === USER_TYPE.PROFESSOR;
};

/**
 * Verifica se usuário é coordenador
 * @param {string} userRole - Tipo de usuário
 * @returns {boolean}
 */
export const isCoordinator = (userRole) => {
  return userRole === USER_TYPE.COORDENADOR;
};

/**
 * Verificar se é um role válido
 * @param {string} role - Role a verificar
 * @returns {boolean}
 */
export const isValidRole = (role) => {
  return Object.values(USER_TYPE).includes(role);
};

/**
 * Guard para componentes - renderiza apenas se tiver permissão
 * Pode ser usado como função auxiliar para guards de rota
 * @param {string} userRole - Tipo de usuário
 * @param {string} resource - Recurso
 * @param {string} action - Ação
 * @param {any} fallback - O que retornar se não tiver permissão
 * @returns {boolean|any}
 */
export const checkPermissionOrFallback = (
  userRole,
  resource,
  action,
  fallback = null
) => {
  return hasPermission(userRole, resource, action) ? true : fallback;
};

/**
 * Retorna o nome em português de um role
 * @param {string} role - Role
 * @returns {string}
 */
export const getRoleLabel = (role) => {
  const labels = {
    [USER_TYPE.ADMIN]: 'Administrador',
    [USER_TYPE.PROFESSOR]: 'Professor',
    [USER_TYPE.COORDENADOR]: 'Coordenador',
  };
  return labels[role] || 'Desconhecido';
};

/**
 * Retorna todos os roles disponíveis
 * @returns {array}
 */
export const getAllRoles = () => {
  return Object.values(USER_TYPE);
};

/**
 * Middleware-like function para verificar permissão antes de executar função
 * @param {string} userRole - Tipo de usuário
 * @param {string} resource - Recurso
 * @param {string} action - Ação
 * @param {function} callback - Função a executar se tiver permissão
 * @param {function} fallback - Função a executar se não tiver permissão
 */
export const withPermission = (
  userRole,
  resource,
  action,
  callback,
  fallback = null
) => {
  if (hasPermission(userRole, resource, action)) {
    return callback();
  }

  if (typeof fallback === 'function') {
    return fallback();
  }

  return fallback;
};

/**
 * Filtra array de recursos baseado em permissões do usuário
 * @param {string} userRole - Tipo de usuário
 * @param {array} resources - Array de recursos com resource e action
 * @returns {array} - Recursos filtrados
 */
export const filterByPermissions = (userRole, resources) => {
  if (!Array.isArray(resources)) return [];

  return resources.filter(({ resource, action }) =>
    hasPermission(userRole, resource, action)
  );
};

export default {
  hasPermission,
  hasAllPermissions,
  hasAnyPermission,
  getUserPermissions,
  getAccessibleResources,
  getAvailableActions,
  isAdmin,
  isTeacher,
  isCoordinator,
  isValidRole,
  checkPermissionOrFallback,
  getRoleLabel,
  getAllRoles,
  withPermission,
  filterByPermissions,
};
