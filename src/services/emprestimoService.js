import { emprestimos as emprestimosIniciais } from '../data/emprestimos';

let emprestimos = [...emprestimosIniciais];

export const emprestimoService = {
  /**
   * Lista todos os empréstimos
   */
  async getAll() {
    try {
      return [...emprestimos].sort((a, b) => {
        const dataA = new Date(
          `${a.dataEmprestimo} ${a.horaEmprestimo || '00:00'}`
        );

        const dataB = new Date(
          `${b.dataEmprestimo} ${b.horaEmprestimo || '00:00'}`
        );

        return dataB - dataA;
      });
    } catch (error) {
      console.error('Erro ao buscar empréstimos:', error);
      return [];
    }
  },

  /**
   * Busca um empréstimo pelo ID
   */
  async getById(id) {
    try {
      return (
        emprestimos.find(
          (emprestimo) => emprestimo.id === id
        ) || null
      );
    } catch (error) {
      console.error('Erro ao buscar empréstimo:', error);
      return null;
    }
  },

  /**
   * Cria um novo empréstimo
   */
  async create(data) {
    try {
      if (!data.notebook?.trim?.() && !data.notebook) {
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
        id: `EMP-${Date.now()}`,
        notebookId: data.notebook,
        professor: data.professor.trim(),
        turma: data.turma.trim(),
        dataEmprestimo:
          data.dataEmprestimo ||
          agora.toISOString().split('T')[0],
        horaEmprestimo: agora.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        dataDevolucao: null,
        horaDevolucao: null,
        status: 'ativo',
        observacao: data.observacao?.trim() || '',
        createdAt: agora.toISOString(),
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
   * Registrar devolução
   */
  async devolver(id) {
    try {
      const index = emprestimos.findIndex(
        (emprestimo) => emprestimo.id === id
      );

      if (index === -1) {
        throw new Error('Empréstimo não encontrado.');
      }

      if (emprestimos[index].status === 'finalizado') {
        throw new Error(
          'Este empréstimo já foi devolvido.'
        );
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
        updatedAt: agora.toISOString(),
      };

      return emprestimos[index];
    } catch (error) {
      console.error(
        'Erro ao registrar devolução:',
        error
      );
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
    try {
      return emprestimos.filter(
        (emprestimo) => emprestimo.status === 'ativo'
      );
    } catch (error) {
      console.error(
        'Erro ao buscar empréstimos ativos:',
        error
      );
      return [];
    }
  },

  /**
   * Histórico de empréstimos
   */
  async getHistorico() {
    try {
      return emprestimos.filter(
        (emprestimo) => emprestimo.status === 'finalizado'
      );
    } catch (error) {
      console.error(
        'Erro ao buscar histórico:',
        error
      );
      return [];
    }
  },

  /**
   * Estatísticas
   */
  async getEstatisticas() {
    const ativos = await this.getAtivos();
    const historico = await this.getHistorico();

    return {
      total: emprestimos.length,
      ativos: ativos.length,
      finalizados: historico.length,
    };
  },

  /**
   * Resetar dados (modo desenvolvimento)
   */
  async reset() {
    emprestimos = [...emprestimosIniciais];
    return true;
  },
};