import { professores as professoresIniciais } from '../data/professores';

let professores = [...professoresIniciais];


export const professorService = {

  async getAll() {
    return [...professores];
  },


  async getById(id) {
    return (
      professores.find(
        (professor) => professor.id === id
      ) || null
    );
  },


  async create(data) {

    const novoProfessor = {
      id: `PROF-${String(professores.length + 1).padStart(3, '0')}`,

      nome: data.nome,

      email: data.email || '',

      telefone: data.telefone || '',

      disciplina: data.disciplina || '',

      ativo: true,

      createdAt: new Date().toISOString(),
    };


    professores.push(novoProfessor);


    return novoProfessor;
  },


  async update(id, data) {

    professores = professores.map(
      (professor) =>
        professor.id === id
          ? {
              ...professor,
              ...data,
            }
          : professor
    );


    return (
      professores.find(
        (professor) => professor.id === id
      ) || null
    );
  },


  async delete(id) {

    professores = professores.filter(
      (professor) =>
        professor.id !== id
    );


    return true;
  },


  async reset() {

    professores = [
      ...professoresIniciais,
    ];


    return true;
  },

};