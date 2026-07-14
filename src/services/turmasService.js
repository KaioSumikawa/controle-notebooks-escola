import { supabase } from './supabase';
import { turmas as turmasIniciais } from '../data/turmas';

let turmas = [...turmasIniciais];

export const turmaService = {

  async getAll() {
    try {
      const { data, error } = await supabase
        .from('turmas')
        .select('*')
        .order('created_at', {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      return data || [];

    } catch (error) {
      console.warn(
        'Supabase indisponível, usando dados locais:',
        error.message
      );

      return [...turmas];
    }
  },


  async getById(id) {
    try {
      const { data, error } = await supabase
        .from('turmas')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      return data;

    } catch (error) {
      return (
        turmas.find(
          (turma) => turma.id === id
        ) || null
      );
    }
  },


  async create(data) {

    if (!data.nome || !data.nome.trim()) {
      throw new Error(
        'Nome da turma é obrigatório.'
      );
    }


    try {
      const { data: novaTurma, error } =
        await supabase
          .from('turmas')
          .insert([
            {
              nome: data.nome.trim(),
            },
          ])
          .select()
          .single();


      if (error) {
        throw error;
      }

      return novaTurma;


    } catch (error) {

      const novaTurma = {
        id: Date.now().toString(),
        nome: data.nome.trim(),
        created_at: new Date().toISOString(),
      };


      turmas.push(novaTurma);

      return novaTurma;
    }
  },


  async update(id, data) {

    if (!data.nome || !data.nome.trim()) {
      throw new Error(
        'Nome da turma é obrigatório.'
      );
    }


    try {
      const { data: turmaAtualizada, error } =
        await supabase
          .from('turmas')
          .update({
            nome: data.nome.trim(),
          })
          .eq('id', id)
          .select()
          .single();


      if (error) {
        throw error;
      }

      return turmaAtualizada;


    } catch (error) {

      turmas = turmas.map((turma) =>
        turma.id === id
          ? {
              ...turma,
              nome: data.nome.trim(),
            }
          : turma
      );


      return turmas.find(
        (turma) => turma.id === id
      );
    }
  },


  async delete(id) {

    try {

      const { error } =
        await supabase
          .from('turmas')
          .delete()
          .eq('id', id);


      if (error) {
        throw error;
      }


      return true;


    } catch (error) {

      turmas = turmas.filter(
        (turma) => turma.id !== id
      );


      return true;
    }
  },


  async reset() {

    turmas = [...turmasIniciais];

    return true;
  },

};