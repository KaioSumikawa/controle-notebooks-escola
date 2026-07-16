import { emprestimoService } from './emprestimoService';

export const devolucaoService = {
  async getAll() {
    try {
      const emprestimos = await emprestimoService.getAll();

      return (emprestimos ?? []).filter(
        (emprestimo) => emprestimo.status === 'ativo'
      );
    } catch (error) {
      console.error(
        'Erro ao carregar devoluções:',
        error
      );

      return [];
    }
  },

  async getById(id) {
    try {
      const emprestimo = await emprestimoService.getById(id);

      if (!emprestimo) {
        return null;
      }

      return emprestimo.status === 'ativo'
        ? emprestimo
        : null;
    } catch (error) {
      console.error(
        'Erro ao buscar devolução:',
        error
      );

      return null;
    }
  },

  async registrar(id) {
    try {
      return await emprestimoService.devolver(id);
    } catch (error) {
      console.error(
        'Erro ao registrar devolução:',
        error
      );

      throw error;
    }
  },

  async registrarLote(ids = []) {
    try {
      const resultados = await Promise.all(
        ids.map(async (id) => {
          try {
            return await emprestimoService.devolver(id);
          } catch {
            return null;
          }
        })
      );

      return resultados.filter(Boolean);
    } catch (error) {
      console.error(
        'Erro ao registrar devoluções em lote:',
        error
      );

      throw error;
    }
  },

  async getHistorico() {
    try {
      const emprestimos = await emprestimoService.getAll();

      return (emprestimos ?? []).filter(
        (emprestimo) => emprestimo.status === 'finalizado'
      );
    } catch (error) {
      console.error(
        'Erro ao carregar histórico de devoluções:',
        error
      );

      return [];
    }
  },
};