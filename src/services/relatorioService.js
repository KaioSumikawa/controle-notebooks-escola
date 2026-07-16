import { notebookService } from './notebookService';
import { emprestimoService } from './emprestimoService';

export const relatorioService = {
  /**
   * Dados gerais do dashboard
   */
  async getDashboard() {
    const notebooks = await notebookService.getAll();
    const emprestimos = await emprestimoService.getAll();

    const totalNotebooks = notebooks.length;

    const notebooksDisponiveis = notebooks.filter(
      (notebook) => notebook.status === 'disponivel'
    ).length;

    const notebooksEmprestados = notebooks.filter(
      (notebook) => notebook.status === 'emprestado'
    ).length;

    const notebooksManutencao = notebooks.filter(
      (notebook) => notebook.status === 'manutencao'
    ).length;

    const totalEmprestimos = emprestimos.length;

    const emprestimosAtivos = emprestimos.filter(
      (emprestimo) => emprestimo.status === 'ativo'
    ).length;

    const devolucoes = emprestimos.filter(
      (emprestimo) => emprestimo.status === 'finalizado'
    ).length;

    const taxaDevolucao =
      totalEmprestimos === 0
        ? 0
        : Number(
            (
              (devolucoes / totalEmprestimos) *
              100
            ).toFixed(1)
          );

    return {
      totalNotebooks,
      notebooksDisponiveis,
      notebooksEmprestados,
      notebooksManutencao,
      totalEmprestimos,
      emprestimosAtivos,
      devolucoes,
      taxaDevolucao,
    };
  },

  /**
   * Lista todos os empréstimos
   * (futuramente poderá filtrar por período)
   */
  async getEmprestimosPorPeriodo() {
    return await emprestimoService.getAll();
  },

  /**
   * Quantidade de notebooks por status
   */
  async getStatusNotebooks() {
    const notebooks = await notebookService.getAll();

    return {
      disponiveis: notebooks.filter(
        (notebook) => notebook.status === 'disponivel'
      ).length,

      emprestados: notebooks.filter(
        (notebook) => notebook.status === 'emprestado'
      ).length,

      manutencao: notebooks.filter(
        (notebook) => notebook.status === 'manutencao'
      ).length,
    };
  },

  /**
   * Últimos empréstimos
   */
  async getUltimosEmprestimos(limit = 5) {
    const emprestimos = await emprestimoService.getAll();

    return emprestimos.slice(0, limit);
  },

  /**
   * Estatísticas completas
   */
  async getEstatisticas() {
    const dashboard = await this.getDashboard();
    const status = await this.getStatusNotebooks();

    return {
      ...dashboard,
      status,
    };
  },
};