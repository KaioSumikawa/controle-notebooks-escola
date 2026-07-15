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
    const notebook = notebooks.find(
      (notebook) => notebook.id === id
    );

    return notebook ? { ...notebook } : null;
  },

  async create(data) {
    const numero = gerarNumero();

    const identificacao = gerarIdentificacao(numero);

    const novoNotebook = {
      id: identificacao,
      numero,
      qrCode: identificacao,
      modelo: data.modelo ?? '',
      patrimonio: data.patrimonio ?? '',
      localizacao: data.localizacao ?? '',
      responsavel: data.responsavel ?? '',
      turma: data.turma ?? '',
      observacao: data.observacao ?? '',
      status: data.status ?? 'disponivel',
      ativo: true,
      dataCadastro: new Date().toISOString(),
    };

    notebooks.push(novoNotebook);

    return { ...novoNotebook };
  },

  async update(id, data) {
    const index = notebooks.findIndex(
      (notebook) => notebook.id === id
    );

    if (index === -1) {
      return null;
    }

    notebooks[index] = {
      ...notebooks[index],
      ...data,
    };

    return { ...notebooks[index] };
  },

  async delete(id) {
    const index = notebooks.findIndex(
      (notebook) => notebook.id === id
    );

    if (index === -1) {
      return false;
    }

    notebooks.splice(index, 1);

    return true;
  },

  async reset() {
    notebooks = [...notebooksIniciais];

    return [...notebooks];
  },
};