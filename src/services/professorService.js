import { professores as professoresIniciais } from '../data/professores';

let professores = [...professoresIniciais];

const gerarNumero = () => professores.length + 1;

const gerarId = (numero) =>
  `PROF-${String(numero).padStart(3, '0')}`;

export const professorService = {
  /**
   * Lista todos os professores
   */
  async getAll() {
    return [...professores].sort((a, b) =>
      a.nome.localeCompare(b.nome, 'pt-BR')
    );
  },

  /**
   * Busca professor por ID
   */
  async getById(id) {
    return (
      professores.find(
        (professor) => professor.id === id
      ) || null
    );
  },

  /**
   * Cadastra professor
   */
  async create(data) {
    if (!data.nome?.trim()) {
      throw new Error('Nome do professor é obrigatório.');
    }

    const numero = gerarNumero();

    const novoProfessor = {
      id: gerarId(numero),
      nome: data.nome.trim(),
      matricula: data.matricula?.trim() || '',
      email: data.email?.trim() || '',
      telefone: data.telefone?.trim() || '',
      disciplina: data.disciplina?.trim() || '',
      ativo: data.ativo ?? true,
      createdAt: new Date().toISOString(),
    };

    professores.push(novoProfessor);

    return { ...novoProfessor };
  },

  /**
   * Atualiza professor
   */
  async update(id, data) {
    const index = professores.findIndex(
      (professor) => professor.id === id
    );

    if (index === -1) {
      throw new Error('Professor não encontrado.');
    }

    professores[index] = {
      ...professores[index],
      ...data,
      nome: data.nome?.trim() ?? professores[index].nome,
      matricula:
        data.matricula?.trim() ??
        professores[index].matricula,
      email:
        data.email?.trim() ??
        professores[index].email,
      telefone:
        data.telefone?.trim() ??
        professores[index].telefone,
      disciplina:
        data.disciplina?.trim() ??
        professores[index].disciplina,
    };

    return { ...professores[index] };
  },

  /**
   * Remove professor
   */
  async delete(id) {
    const index = professores.findIndex(
      (professor) => professor.id === id
    );

    if (index === -1) {
      throw new Error('Professor não encontrado.');
    }

    professores.splice(index, 1);

    return true;
  },

  /**
   * Reinicia os dados
   */
  async reset() {
    professores = [...professoresIniciais];

    return [...professores];
  },
};