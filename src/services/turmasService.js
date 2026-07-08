import { supabase } from './supabase';

/**
 * Busca todas as turmas
 * @returns {Promise<Array>} Lista de turmas
 */
export async function getTurmas() {
  try {
    const { data, error } = await supabase
      .from('turmas')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar turmas:', error);
    throw new Error(error.message || 'Erro ao buscar turmas');
  }
}

/**
 * Busca uma turma pelo ID
 * @param {string} id - ID da turma
 * @returns {Promise<Object>} Dados da turma
 */
export async function getTurmaById(id) {
  try {
    const { data, error } = await supabase
      .from('turmas')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao buscar turma:', error);
    throw new Error(error.message || 'Erro ao buscar turma');
  }
}

/**
 * Cria uma nova turma
 * @param {Object} turma - Dados da turma { nome }
 * @returns {Promise<Object>} Turma criada
 */
export async function createTurma(turma) {
  try {
    if (!turma.nome || turma.nome.trim() === '') {
      throw new Error('Nome da turma é obrigatório');
    }

    const { data, error } = await supabase
      .from('turmas')
      .insert([{ nome: turma.nome.trim() }])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new Error('Essa turma já existe');
      }
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Erro ao criar turma:', error);
    throw new Error(error.message || 'Erro ao criar turma');
  }
}

/**
 * Atualiza uma turma existente
 * @param {string} id - ID da turma
 * @param {Object} updates - Dados a atualizar { nome }
 * @returns {Promise<Object>} Turma atualizada
 */
export async function updateTurma(id, updates) {
  try {
    if (!updates.nome || updates.nome.trim() === '') {
      throw new Error('Nome da turma é obrigatório');
    }

    const { data, error } = await supabase
      .from('turmas')
      .update({ nome: updates.nome.trim() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new Error('Essa turma já existe');
      }
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Erro ao atualizar turma:', error);
    throw new Error(error.message || 'Erro ao atualizar turma');
  }
}

/**
 * Verifica se existe alunos vinculados a uma turma
 * @param {string} turmaId - ID da turma
 * @returns {Promise<number>} Quantidade de alunos
 */
export async function countAlunosPorTurma(turmaId) {
  try {
    const { count, error } = await supabase
      .from('alunos')
      .select('*', { count: 'exact', head: true })
      .eq('turma_id', turmaId);

    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Erro ao contar alunos:', error);
    throw new Error(error.message || 'Erro ao contar alunos');
  }
}

/**
 * Deleta uma turma (apenas se não houver alunos vinculados)
 * @param {string} id - ID da turma
 * @returns {Promise<Object>} Resultado da deleção
 */
export async function deleteTurma(id) {
  try {
    // Verificar se há alunos vinculados
    const alunosCount = await countAlunosPorTurma(id);
    if (alunosCount > 0) {
      throw new Error(
        `Não é possível excluir esta turma. Existem ${alunosCount} aluno(s) vinculado(s).`
      );
    }

    const { data, error } = await supabase
      .from('turmas')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao deletar turma:', error);
    throw new Error(error.message || 'Erro ao deletar turma');
  }
}
