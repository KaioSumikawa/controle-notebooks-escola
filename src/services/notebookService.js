import { notebooks as notebooksIniciais } from '../data/notebooks';

let notebooks = [...notebooksIniciais];

const gerarNumero = () => notebooks.length + 1;

const gerarIdentificacao = (numero) =>
  `NB-${String(numero).padStart(3, '0')}`;

export const notebookService = {
  /**
   * Lista todos os notebooks
   */
  async getAll() {
    try {
      return [...notebooks].sort(
        (a, b) => (a.numero || 0) - (b.numero || 0)
      );
    } catch (error) {
      console.error('Erro ao buscar notebooks:', error);
      return [];
    }
  },

  /**
   * Busca notebook pelo ID
   */
  async getById(id) {
    try {
      return (
        notebooks.find(
          (notebook) => notebook.id === id
        ) || null
      );
    } catch (error) {
      console.error('Erro ao buscar notebook:', error);
      return null;
    }
  },

  /**
   * Cadastra notebook
   */
  async create(data) {
    try {
      if (!data.modelo?.trim()) {
        throw new Error(
          'Informe o modelo do notebook.'
        );
      }

      const numero = gerarNumero();
      const identificacao =
        gerarIdentificacao(numero);

      const novoNotebook = {
        id: identificacao,
        numero,
        qrCode: identificacao,

        modelo: data.modelo.trim(),
        patrimonio: data.patrimonio?.trim() || '',
        localizacao: data.localizacao?.trim() || '',
        responsavel: data.responsavel?.trim() || '',
        turma: data.turma?.trim() || '',
        observacao: data.observacao?.trim() || '',

        status: data.status || 'disponivel',
        ativo: true,

        createdAt: new Date().toISOString(),
      };

      notebooks.push(novoNotebook);

      return novoNotebook;
    } catch (error) {
      console.error(
        'Erro ao cadastrar notebook:',
        error
      );
      throw error;
    }
  },

  /**
   * Atualiza notebook
   */
  async update(id, data) {
    try {
      const index = notebooks.findIndex(
        (notebook) => notebook.id === id
      );

      if (index === -1) {
        throw new Error(
          'Notebook não encontrado.'
        );
      }

      notebooks[index] = {
        ...notebooks[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };

      return notebooks[index];
    } catch (error) {
      console.error(
        'Erro ao atualizar notebook:',
        error
      );
      throw error;
    }
  },

  /**
   * Remove notebook
   */
  async delete(id) {
    try {
      const existe = notebooks.some(
        (notebook) => notebook.id === id
      );

      if (!existe) {
        throw new Error(
          'Notebook não encontrado.'
        );
      }

      notebooks = notebooks.filter(
        (notebook) => notebook.id !== id
      );

      return true;
    } catch (error) {
      console.error(
        'Erro ao remover notebook:',
        error
      );
      throw error;
    }
  },

  /**
   * Disponíveis
   */
  async getDisponiveis() {
    try {
      return notebooks.filter(
        (notebook) =>
          notebook.status === 'disponivel'
      );
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  /**
   * Emprestados
   */
  async getEmprestados() {
    try {
      return notebooks.filter(
        (notebook) =>
          notebook.status === 'emprestado'
      );
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  /**
   * Em manutenção
   */
  async getManutencao() {
    try {
      return notebooks.filter(
        (notebook) =>
          notebook.status === 'manutencao'
      );
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  /**
   * Estatísticas
   */
  async getEstatisticas() {
    const disponiveis =
      await this.getDisponiveis();

    const emprestados =
      await this.getEmprestados();

    const manutencao =
      await this.getManutencao();

    return {
      total: notebooks.length,
      disponiveis: disponiveis.length,
      emprestados: emprestados.length,
      manutencao: manutencao.length,
    };
  },

  /**
   * Resetar dados
   */
  async reset() {
    notebooks = [...notebooksIniciais];
    return true;
  },
};