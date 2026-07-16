/**
 * Rotas da aplicação
 */

export const ROUTES = {
  HOME: '/',

  LOGIN: '/login',

  DASHBOARD: '/dashboard',

  NOTEBOOKS: '/notebooks',

  EMPRESTIMOS: '/emprestimos',

  DEVOLUCOES: '/devolucoes',

  PROFESSORES: '/professores',

  TURMAS: '/turmas',

  HISTORICO: '/historico',

  RELATORIOS: '/relatorios',

  CONFIGURACOES: '/configuracoes',

  PERFIL: '/perfil',

  QR_CODE: '/qrcode',

  NOT_FOUND: '*',
};

/**
 * Menu lateral do sistema.
 */
export const SIDEBAR_ROUTES = [
  {
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: 'LayoutDashboard',
  },
  {
    label: 'Notebooks',
    path: ROUTES.NOTEBOOKS,
    icon: 'Laptop',
  },
  {
    label: 'Empréstimos',
    path: ROUTES.EMPRESTIMOS,
    icon: 'ArrowRightLeft',
  },
  {
    label: 'Devoluções',
    path: ROUTES.DEVOLUCOES,
    icon: 'Undo2',
  },
  {
    label: 'Professores',
    path: ROUTES.PROFESSORES,
    icon: 'Users',
  },
  {
    label: 'Turmas',
    path: ROUTES.TURMAS,
    icon: 'GraduationCap',
  },
  {
    label: 'Histórico',
    path: ROUTES.HISTORICO,
    icon: 'History',
  },
  {
    label: 'Relatórios',
    path: ROUTES.RELATORIOS,
    icon: 'BarChart3',
  },
  {
    label: 'Configurações',
    path: ROUTES.CONFIGURACOES,
    icon: 'Settings',
  },
];

/**
 * Verifica se uma rota existe.
 */
export function isValidRoute(path) {
  return Object.values(ROUTES).includes(path);
}