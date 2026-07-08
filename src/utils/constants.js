/**
 * Constantes globais do projeto
 * Centraliza todas as constantes para fácil manutenção e acesso
 */

// ========================================
// STATUS DOS NOTEBOOKS
// ========================================
export const NOTEBOOK_STATUS = {
  DISPONIVEL: 'disponivel',
  EMPRESTADO: 'emprestado',
  MANUTENCAO: 'manutencao',
};

export const NOTEBOOK_STATUS_LABEL = {
  [NOTEBOOK_STATUS.DISPONIVEL]: 'Disponível',
  [NOTEBOOK_STATUS.EMPRESTADO]: 'Emprestado',
  [NOTEBOOK_STATUS.MANUTENCAO]: 'Manutenção',
};

export const NOTEBOOK_STATUS_COLOR = {
  [NOTEBOOK_STATUS.DISPONIVEL]: 'bg-green-100 text-green-800 border-green-300',
  [NOTEBOOK_STATUS.EMPRESTADO]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  [NOTEBOOK_STATUS.MANUTENCAO]: 'bg-red-100 text-red-800 border-red-300',
};

export const NOTEBOOK_STATUS_ICON = {
  [NOTEBOOK_STATUS.DISPONIVEL]: 'CheckCircle',
  [NOTEBOOK_STATUS.EMPRESTADO]: 'AlertCircle',
  [NOTEBOOK_STATUS.MANUTENCAO]: 'XCircle',
};

// ========================================
// STATUS DOS EMPRÉSTIMOS
// ========================================
export const LOAN_STATUS = {
  ATIVO: 'ativo',
  FINALIZADO: 'finalizado',
  ATRASADO: 'atrasado',
};

export const LOAN_STATUS_LABEL = {
  [LOAN_STATUS.ATIVO]: 'Ativo',
  [LOAN_STATUS.FINALIZADO]: 'Finalizado',
  [LOAN_STATUS.ATRASADO]: 'Atrasado',
};

export const LOAN_STATUS_COLOR = {
  [LOAN_STATUS.ATIVO]: 'bg-blue-100 text-blue-800 border-blue-300',
  [LOAN_STATUS.FINALIZADO]: 'bg-green-100 text-green-800 border-green-300',
  [LOAN_STATUS.ATRASADO]: 'bg-red-100 text-red-800 border-red-300',
};

// ========================================
// TIPOS DE USUÁRIOS
// ========================================
export const USER_TYPE = {
  ADMIN: 'admin',
  PROFESSOR: 'professor',
  COORDENADOR: 'coordenador',
};

export const USER_TYPE_LABEL = {
  [USER_TYPE.ADMIN]: 'Administrador',
  [USER_TYPE.PROFESSOR]: 'Professor',
  [USER_TYPE.COORDENADOR]: 'Coordenador',
};

// ========================================
// ROTAS DA APLICAÇÃO
// ========================================
export const ROUTES = {
  ROOT: '/',
  DASHBOARD: '/dashboard',
  TURMAS: '/turmas',
  ALUNOS: '/alunos',
  NOTEBOOKS: '/notebooks',
  EMPRESTIMOS: '/emprestimos',
  DEVOLUCOES: '/devolucoes',
  HISTORICO: '/historico',
  RELATORIOS: '/relatorios',
  CONFIGURACOES: '/configuracoes',
  LOGIN: '/login',
};

export const ROUTES_LABEL = {
  [ROUTES.DASHBOARD]: 'Dashboard',
  [ROUTES.TURMAS]: 'Turmas',
  [ROUTES.ALUNOS]: 'Alunos',
  [ROUTES.NOTEBOOKS]: 'Notebooks',
  [ROUTES.EMPRESTIMOS]: 'Empréstimos',
  [ROUTES.DEVOLUCOES]: 'Devoluções',
  [ROUTES.HISTORICO]: 'Histórico',
  [ROUTES.RELATORIOS]: 'Relatórios',
  [ROUTES.CONFIGURACOES]: 'Configurações',
  [ROUTES.LOGIN]: 'Login',
};

// ========================================
// MENSAGENS PADRÃO
// ========================================
export const MESSAGES = {
  // Sucesso
  SUCCESS_CREATE: '{entity} criado com sucesso!',
  SUCCESS_UPDATE: '{entity} atualizado com sucesso!',
  SUCCESS_DELETE: '{entity} excluído com sucesso!',

  // Erro
  ERROR_CREATE: 'Erro ao criar {entity}',
  ERROR_UPDATE: 'Erro ao atualizar {entity}',
  ERROR_DELETE: 'Erro ao excluir {entity}',
  ERROR_FETCH: 'Erro ao buscar {entity}',
  ERROR_VALIDATION: 'Erro na validação: {message}',
  ERROR_DUPLICATE: 'Este registro já existe',
  ERROR_NOT_FOUND: '{entity} não encontrado',
  ERROR_PERMISSION: 'Você não tem permissão para essa ação',
  ERROR_REQUIRED_FIELD: 'Campo obrigatório: {field}',

  // Validação
  REQUIRED_FIELD: 'Este campo é obrigatório',
  INVALID_EMAIL: 'E-mail inválido',
  MIN_LENGTH: 'Mínimo de {min} caracteres',
  MAX_LENGTH: 'Máximo de {max} caracteres',

  // Confirmação
  CONFIRM_DELETE: 'Tem certeza que deseja excluir?',
  CONFIRM_ACTION: 'Confirmar ação?',

  // Avisos
  WARNING_DELETE_RESTRICTED: 'Não é possível deletar {entity} porque existem {count} relacionamento(s)',
  WARNING_UNSAVED_CHANGES: 'Você tem alterações não salvas',
};

// ========================================
// CORES E ESTILOS
// ========================================
export const COLORS = {
  PRIMARY: '#3B82F6',
  SECONDARY: '#8B5CF6',
  SUCCESS: '#10B981',
  ERROR: '#EF4444',
  WARNING: '#F59E0B',
  INFO: '#0EA5E9',
  LIGHT_GRAY: '#F3F4F6',
  DARK_GRAY: '#1F2937',
};

// ========================================
// PAGINAÇÃO
// ========================================
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE: 1,
  PAGE_SIZES: [10, 25, 50, 100],
};

// ========================================
// TIMEOUTS E DELAYS
// ========================================
export const TIMING = {
  TOAST_DURATION: 3000,
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 500,
  REQUEST_TIMEOUT: 30000,
};

// ========================================
// TABELAS DO BANCO DE DADOS
// ========================================
export const TABLES = {
  USUARIOS: 'usuarios',
  TURMAS: 'turmas',
  ALUNOS: 'alunos',
  NOTEBOOKS: 'notebooks',
  EMPRESTIMOS: 'emprestimos',
};

// ========================================
// CAMPOS PADRÃO
// ========================================
export const STANDARD_FIELDS = {
  ID: 'id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

// ========================================
// VALIDAÇÕES
// ========================================
export const VALIDATION_RULES = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_PATTERN: /^\(?[0-9]{2}\)?[\s]?[0-9]{4,5}-?[0-9]{4}$/,
};

// ========================================
// OPÇÕES PADRÃO
// ========================================
export const DEFAULT_OPTIONS = {
  SORT_BY: 'created_at',
  SORT_ORDER: 'DESC',
};
