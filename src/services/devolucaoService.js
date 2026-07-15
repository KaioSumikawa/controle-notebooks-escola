import { emprestimoService } from './emprestimoService';

export const devolucaoService = {
  async getAll() {
    const emprestimos = await emprestimoService.getAll();

    return emprestimos.filter(
      (emprestimo) => emprestimo.status === 'ativo'
    );
  },

  async getById(id) {
    const emprestimo = await emprestimoService.getById(id);

    if (!emprestimo || emprestimo.status !== 'ativo') {
      return null;
    }

    return emprestimo;
  },

  async registrar(id) {
    return await emprestimoService.devolver(id);
  },

  async registrarLote(ids = []) {
    const resultados = [];

    for (const id of ids) {
      const devolucao = await emprestimoService.devolver(id);

      if (devolucao) {
        resultados.push(devolucao);
      }
    }

    return resultados;
  },

  async getHistorico() {
    const emprestimos = await emprestimoService.getAll();

    return emprestimos.filter(
      (emprestimo) => emprestimo.status === 'finalizado'
    );
  },
};