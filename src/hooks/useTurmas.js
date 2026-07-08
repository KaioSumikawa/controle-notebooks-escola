import { useState, useCallback, useEffect } from 'react';
import { getTurmas, createTurma, updateTurma, deleteTurma } from '../services/turmasService';

/**
 * Hook para gerenciar turmas
 * @returns {Object} Estados e funções para CRUD de turmas
 */
export function useTurmas() {
  const [turmas, setTurmas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Buscar turmas
  const fetchTurmas = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getTurmas();
      setTurmas(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Criar turma
  const handleCreate = useCallback(async (novasTurma) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);
      const novaTurma = await createTurma(novasTurma);
      setTurmas((prev) => [novaTurma, ...prev]);
      setSuccess('Turma criada com sucesso!');
      return novaTurma;
    } catch (err) {
      setError(err.message);
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Atualizar turma
  const handleUpdate = useCallback(async (id, updates) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);
      const turmaAtualizada = await updateTurma(id, updates);
      setTurmas((prev) =>
        prev.map((t) => (t.id === id ? turmaAtualizada : t))
      );
      setSuccess('Turma atualizada com sucesso!');
      return turmaAtualizada;
    } catch (err) {
      setError(err.message);
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Deletar turma
  const handleDelete = useCallback(async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);
      await deleteTurma(id);
      setTurmas((prev) => prev.filter((t) => t.id !== id));
      setSuccess('Turma excluída com sucesso!');
    } catch (err) {
      setError(err.message);
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Limpar mensagens de sucesso/erro
  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  return {
    turmas,
    isLoading,
    error,
    success,
    fetchTurmas,
    handleCreate,
    handleUpdate,
    handleDelete,
    clearMessages,
  };
}
