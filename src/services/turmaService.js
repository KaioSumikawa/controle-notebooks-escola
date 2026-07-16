import { supabase } from './supabase';
import { turmas as turmasIniciais } from '../data/turmas';

let turmas = [...turmasIniciais];

const isSupabaseAvailable = () =>
  supabase &&
  typeof supabase.from === 'function';

export const turmaService = {
  async getAll() {
    if (!isSupabaseAvailable()) {
      return [...turmas];
    }

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

      return data ?? [];
    } catch (err) {
      console.warn(
        'Supabase indisponível. Utilizando dados locais.',
        err?.message
      );

      return [...turmas];
    }
  },

  async getById(id) {
    if (!isSupabaseAvailable()) {
      const turma = turmas.find(
        (item) => item.id === id
      );

      return turma ? { ...turma } : null;
    }

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
    } catch (err) {
      console.warn(err?.message);

      const turma = turmas.find(
        (item) => item.id === id
      );

      return turma ? { ...turma } : null;
    }
  },

  async create(data) {
    const nome = data?.nome?.trim();

    if (!nome) {
      throw new Error(
        'Nome da turma é obrigatório.'
      );
    }

    if (!isSupabaseAvailable()) {
      const novaTurma = {
        id: Date.now().toString(),
        nome,
        created_at: new Date().toISOString(),
      };

      turmas.push(novaTurma);

      return { ...novaTurma };
    }

    try {
      const { data: novaTurma, error } =
        await supabase
          .from('turmas')
          .insert([
            {
              nome,
            },
          ])
          .select()
          .single();

      if (error) {
        throw error;
      }

      return novaTurma;
    } catch (err) {
      console.warn(err?.message);

      const novaTurma = {
        id: Date.now().toString(),
        nome,
        created_at: new Date().toISOString(),
      };

      turmas.push(novaTurma);

      return { ...novaTurma };
    }
  },

  async update(id, data) {
    const nome = data?.nome?.trim();

    if (!nome) {
      throw new Error(
        'Nome da turma é obrigatório.'
      );
    }

    if (!isSupabaseAvailable()) {
      let turmaAtualizada = null;

      turmas = turmas.map((turma) => {
        if (turma.id !== id) {
          return turma;
        }

        turmaAtualizada = {
          ...turma,
          nome,
        };

        return turmaAtualizada;
      });

      return turmaAtualizada
        ? { ...turmaAtualizada }
        : null;
    }

    try {
      const { data: turmaAtualizada, error } =
        await supabase
          .from('turmas')
          .update({
            nome,
          })
          .eq('id', id)
          .select()
          .single();

      if (error) {
        throw error;
      }

      return turmaAtualizada;
    } catch (err) {
      console.warn(err?.message);

      let turmaAtualizada = null;

      turmas = turmas.map((turma) => {
        if (turma.id !== id) {
          return turma;
        }

        turmaAtualizada = {
          ...turma,
          nome,
        };

        return turmaAtualizada;
      });

      return turmaAtualizada
        ? { ...turmaAtualizada }
        : null;
    }
  },

  async delete(id) {
    if (!isSupabaseAvailable()) {
      turmas = turmas.filter(
        (turma) => turma.id !== id
      );

      return true;
    }

    try {
      const { error } = await supabase
        .from('turmas')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      return true;
    } catch (err) {
      console.warn(err?.message);

      turmas = turmas.filter(
        (turma) => turma.id !== id
      );

      return true;
    }
  },

  async reset() {
    turmas = [...turmasIniciais];

    return [...turmas];
  },
};