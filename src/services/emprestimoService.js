import { emprestimos as emprestimosIniciais } from '../data/emprestimos';

let emprestimos = [...emprestimosIniciais];

export const emprestimoService = {
  async getAll() {
    return [...emprestimos];
  },

  async getById(id) {
    return emprestimos.find((emprestimo) => emprestimo.id === id) || null;
  },

  async create(data) {
    const agora = new Date();

    const novoEmprestimo = {
      id: Date.now().toString(),
      notebookId: data.notebook || '',
      professor: data.professor || '',
      turma: data.turma || '',
      dataEmprestimo:
        data.dataEmprestimo || agora.toISOString().split('T')[0],
      horaEmprestimo: agora.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      dataDevolucao: null,
      horaDevolucao: null,
      status: 'ativo',
      observacao: data.observacao || '',
    };

    emprestimos.push(novoEmprestimo);

    return novoEmprestimo;
  },

  async update(id, data) {
    const index = emprestimos.findIndex(
      (emprestimo) => emprestimo.id === id
    );

    if (index === -1) {
      return null;
    }

    emprestimos[index] = {
      ...emprestimos[index],
      ...data,
    };

    return emprestimos[index];
  },

  async devolver(id) {
    const index = emprestimos.findIndex(
      (emprestimo) => emprestimo.id === id
    );

    if (index === -1) {
      return null;
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
  },

  async delete(id) {
    emprestimos = emprestimos.filter(
      (emprestimo) => emprestimo.id !== id
    );

    return true;
  },

  async reset() {
    emprestimos = [...emprestimosIniciais];

    return true;
  },
};