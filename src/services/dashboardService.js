import { notebookService } from './notebookService';
import { emprestimoService } from './emprestimoService';

export const dashboardService = {
  async getDashboardData() {
    try {
      const [notebooks, emprestimos] = await Promise.all([
        notebookService.getAll(),
        emprestimoService.getAll(),
      ]);

      const listaNotebooks = notebooks ?? [];
      const listaEmprestimos = emprestimos ?? [];

      const totalNotebooks = listaNotebooks.length;

      const notebooksDisponiveis = listaNotebooks.filter(
        (notebook) => notebook.status === 'disponivel'
      ).length;

      const notebooksEmprestados = listaNotebooks.filter(
        (notebook) => notebook.status === 'emprestado'
      ).length;

      const notebooksManutencao = listaNotebooks.filter(
        (notebook) => notebook.status === 'manutencao'
      ).length;

      const emprestimosAtivos = listaEmprestimos.filter(
        (emprestimo) => emprestimo.status === 'ativo'
      );

      const ultimosEmprestimos = [...listaEmprestimos]
        .sort((a, b) => {
          const dataA = new Date(
            `${a.dataEmprestimo} ${a.horaEmprestimo || '00:00'}`
          );

          const dataB = new Date(
            `${b.dataEmprestimo} ${b.horaEmprestimo || '00:00'}`
          );

          return dataB - dataA;
        })
        .slice(0, 5);

      return {
        totalNotebooks,
        notebooksDisponiveis,
        notebooksEmprestados,
        notebooksManutencao,
        emprestimosAtivos,
        ultimosEmprestimos,
        notebooks: listaNotebooks,
        emprestimos: listaEmprestimos,
      };
    } catch (error) {
      console.error(
        'Erro ao carregar dados do dashboard:',
        error
      );

      return {
        totalNotebooks: 0,
        notebooksDisponiveis: 0,
        notebooksEmprestados: 0,
        notebooksManutencao: 0,
        emprestimosAtivos: [],
        ultimosEmprestimos: [],
        notebooks: [],
        emprestimos: [],
      };
    }
  },
};