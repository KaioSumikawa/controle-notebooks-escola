import { emprestimos as emprestimosIniciais } from '../data/emprestimos';

let emprestimos = [...emprestimosIniciais];

export const emprestimoService = {
  /**
   * Lista todos os empréstimos
   */
  async getAll() {
    try {
      return [...emprestimos].sort((a, b) => {
        const dataA = new Date(`${a.dataEmprestimo} ${a.horaEmprestimo}`);
        const dataB = new Date(`${b.dataEmprestimo} ${b.horaEmprestimo}`);
        return dataB - dataA;
      });
    } catch (error) {
      console.error('Erro ao buscar empréstimos:', error);
      throw new Error('Erro ao buscar empréstimos.');
    }
  },

  /**
   * Busca um empréstimo pelo ID
   */
  async getById(id) {
    try {
      return (
        emprestimos.find((emprestimo) => emprestimo.id === id) || null
      );
    } catch (error) {
      console.error('Erro ao buscar empréstimo:', error);
      throw new Error('Erro ao buscar empréstimo.');
    }
  },

  /**
   * Cria um novo empréstimo
   */
  async create(data) {
    try {
      if (!data.notebook) {
        throw new Error('Selecione um notebook.');
      }

      if (!data.professor?.trim()) {
        throw new Error('Professor é obrigatório.');
      }

      if (!data.turma?.trim()) {
        throw new Error('Turma é obrigatória.');
      }

      const agora = new Date();

      const novoEmprestimo = {
        id: Date.now().toString(),

        notebookId: data.notebook,

        professor: data.professor.trim(),

        turma: data.turma.trim(),

        dataEmprestimo:
          data.dataEmprestimo || agora.toISOString().split('T')[0],

        horaEmprestimo: agora.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),

        dataDevolucao: null,

        horaDevolucao: null,

        status: 'ativo',

        observacao: data.observacao?.trim() || '',
      };

      emprestimos.unshift(novoEmprestimo);

      return novoEmprestimo;
    } catch (error) {
      console.error('Erro ao criar empréstimo:', error);
      throw error;
    }
  },

  /**
   * Atualiza um empréstimo
   */
  async update(id, updates) {
    try {
      const index = emprestimos.findIndex(
        (emprestimo) => emprestimo.id === id
      );

      if (index === -1) {
        throw new Error('Empréstimo não encontrado.');
      }

      emprestimos[index] = {
        ...emprestimos[index],
        ...updates,
      };

      return emprestimos[index];
    } catch (error) {
      console.error('Erro ao atualizar empréstimo:', error);
      throw error;
    }
  },

  /**
   * Registra a devolução
   */
  async devolver(id) {
    try {
      const index = emprestimos.findIndex(
        (emprestimo) => emprestimo.id === id
      );

      if (index === -1) {
        throw new Error('Empréstimo não encontrado.');
      }

      const agora = new Date();

      emprestimos[index] = {
        ...emprestimos[index],
        status: 'finalizado',
        dataDevolucao: agora.toISOString().split('T')[0],
        horaDevolucao: agora.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      return emprestimos[index];
    } catch (error) {
      console.error('Erro ao registrar devolução:', error);
      throw error;
    }
  },

  /**
   * Remove um empréstimo
   */
  async delete(id) {
    try {
      const existe = emprestimos.some(
        (emprestimo) => emprestimo.id === id
      );

      if (!existe) {
        throw new Error('Empréstimo não encontrado.');
      }

      emprestimos = emprestimos.filter(
        (emprestimo) => emprestimo.id !== id
      );

      return true;
    } catch (error) {
      console.error('Erro ao remover empréstimo:', error);
      throw error;
    }
  },

  /**
   * Empréstimos ativos
   */
  async getAtivos() {
    return emprestimos.filter(
      (emprestimo) => emprestimo.status === 'ativo'
    );
  },

  /**
   * Histórico (finalizados)
   */
  async getHistorico() {
    return emprestimos.filter(
      (emprestimo) => emprestimo.status === 'finalizado'
    );
  },

  /**
   * Restaura os dados iniciais
   */
  async reset() {
    emprestimos = [...emprestimosIniciais];
    return true;
  },
};