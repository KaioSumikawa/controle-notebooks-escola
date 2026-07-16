import { historico as historicoInicial } from '../data/historico';

let historico = [...historicoInicial];

export const historicoService = {
  /**
   * Lista todos os registros do histórico
   */
  async getAll() {
    try {
      return [...historico].sort((a, b) => {
        const dataA = new Date(
          `${a.dataEmprestimo || a.data} ${a.horaEmprestimo || a.hora || '00:00'}`
        );

        const dataB = new Date(
          `${b.dataEmprestimo || b.data} ${b.horaEmprestimo || b.hora || '00:00'}`
        );

        return dataB - dataA;
      });
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
      return [];
    }
  },

  /**
   * Buscar registro por ID
   */
  async getById(id) {
    try {
      return (
        historico.find((item) => item.id === id) || null
      );
    } catch (error) {
      console.error('Erro ao buscar registro:', error);
      return null;
    }
  },

  /**
   * Criar novo registro
   */
  async create(data) {
    try {
      const agora = new Date();

      const novoRegistro = {
        id: `HIST-${Date.now()}`,

        notebookId: data.notebookId || '',
        professor: data.professor || '',
        turma: data.turma || '',

        tipo: data.tipo || 'emprestimo',

        dataEmprestimo:
          data.dataEmprestimo ||
          agora.toISOString().split('T')[0],

        horaEmprestimo:
          data.horaEmprestimo ||
          agora.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          }),

        dataDevolucao:
          data.dataDevolucao || null,

        horaDevolucao:
          data.horaDevolucao || null,

        status:
          data.status || 'ativo',

        observacao:
          data.observacao?.trim() || '',

        createdAt: agora.toISOString(),
      };

      historico.unshift(novoRegistro);

      return novoRegistro;
    } catch (error) {
      console.error('Erro ao criar registro:', error);
      throw error;
    }
  },

  /**
   * Atualizar registro
   */
  async update(id, data) {
    try {
      const index = historico.findIndex(
        (item) => item.id === id
      );

      if (index === -1) {
        throw new Error(
          'Registro não encontrado.'
        );
      }

      historico[index] = {
        ...historico[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };

      return historico[index];
    } catch (error) {
      console.error(
        'Erro ao atualizar registro:',
        error
      );
      throw error;
    }
  },

  /**
   * Remover registro
   */
  async delete(id) {
    try {
      const existe = historico.some(
        (item) => item.id === id
      );

      if (!existe) {
        throw new Error(
          'Registro não encontrado.'
        );
      }

      historico = historico.filter(
        (item) => item.id !== id
      );

      return true;
    } catch (error) {
      console.error(
        'Erro ao remover registro:',
        error
      );
      throw error;
    }
  },

  /**
   * Buscar somente empréstimos ativos
   */
  async getAtivos() {
    try {
      return historico.filter(
        (item) => item.status === 'ativo'
      );
    } catch (error) {
      console.error(
        'Erro ao buscar registros ativos:',
        error
      );
      return [];
    }
  },

  /**
   * Buscar histórico finalizado
   */
  async getFinalizados() {
    try {
      return historico.filter(
        (item) => item.status === 'finalizado'
      );
    } catch (error) {
      console.error(
        'Erro ao buscar registros finalizados:',
        error
      );
      return [];
    }
  },

  /**
   * Estatísticas do histórico
   */
  async getEstatisticas() {
    const ativos = await this.getAtivos();
    const finalizados = await this.getFinalizados();

    return {
      total: historico.length,
      ativos: ativos.length,
      finalizados: finalizados.length,
    };
  },

  /**
   * Resetar dados (modo desenvolvimento)
   */
  async reset() {
    historico = [...historicoInicial];
    return true;
  },
};