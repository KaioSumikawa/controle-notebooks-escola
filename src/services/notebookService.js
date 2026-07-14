import { notebooks as notebooksIniciais } from '../data/notebooks';

let notebooks = [...notebooksIniciais];

const gerarNumero = () => notebooks.length + 1;

const gerarIdentificacao = (numero) =>
  `NB-${String(numero).padStart(3, '0')}`;

export const notebookService = {
  async getAll() {
    return [...notebooks];
  },

  async getById(id) {
    return notebooks.find((notebook) => notebook.id === id) ?? null;
  },

  async create(data) {
    const numero = gerarNumero();

    const novoNotebook = {
      id: gerarIdentificacao(numero),
      numero,
      qrCode: gerarIdentificacao(numero),
      modelo: '',
      patrimonio: '',
      localizacao: '',
      responsavel: '',
      turma: '',
      observacao: '',
      status: 'disponivel',
      ativo: true,
      dataCadastro: new Date().toISOString(),
      ...data,
    };

    notebooks.push(novoNotebook);

    return novoNotebook;
  },

  async update(id, data) {
    let notebookAtualizado = null;

    notebooks = notebooks.map((notebook) => {
      if (notebook.id !== id) return notebook;

      notebookAtualizado = {
        ...notebook,
        ...data,
      };

      return notebookAtualizado;
    });

    return notebookAtualizado;
  },

  async delete(id) {
    const quantidadeAnterior = notebooks.length;

    notebooks = notebooks.filter(
      (notebook) => notebook.id !== id
    );

    return notebooks.length !== quantidadeAnterior;
  },

  async reset() {
    notebooks = [...notebooksIniciais];

    return [...notebooks];
  },
};