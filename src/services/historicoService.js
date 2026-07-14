import { historico as historicoInicial } from '../data/historico';

let historico = [...historicoInicial];

export const historicoService = {

  // Buscar todos os registros
  async getAll() {
    return [...historico];
  },


  // Buscar registro por ID
  async getById(id) {
    return (
      historico.find(
        (item) => item.id === id
      ) || null
    );
  },


  // Criar novo registro
  async create(data) {
    const agora = new Date();

    const novoRegistro = {
      id: `HIST-${Date.now()}`,

      notebookId: data.notebookId || '',
      professor: data.professor || '',
      turma: data.turma || '',

      tipo: data.tipo || 'emprestimo',

      data:
        data.data ||
        agora.toISOString().split('T')[0],

      hora:
        data.hora ||
        agora.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),

      status: data.status || 'finalizado',

      observacao:
        data.observacao || '',

      createdAt:
        agora.toISOString(),
    };


    historico.push(novoRegistro);

    return novoRegistro;
  },


  // Atualizar registro
  async update(id, data) {
    historico = historico.map((item) =>
      item.id === id
        ? {
            ...item,
            ...data,
          }
        : item
    );


    return (
      historico.find(
        (item) => item.id === id
      ) || null
    );
  },


  // Excluir registro
  async delete(id) {
    historico = historico.filter(
      (item) => item.id !== id
    );

    return true;
  },


  // Resetar dados para testes
  async reset() {
    historico = [
      ...historicoInicial
    ];

    return true;
  },

};