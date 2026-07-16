// src/services/index.js

/**
 * Centralizador de todos os services da aplicação.
 * Basta importar deste arquivo ao invés de importar
 * cada service individualmente.
 */

export * from './supabase';

export * from './notebookService';
export * from './professorService';
export * from './turmaService';

export * from './emprestimoService';
export * from './devolucaoService';
export * from './historicoService';

export * from './dashboardService';
export * from './relatorioService';

export * from './qrCodeService';