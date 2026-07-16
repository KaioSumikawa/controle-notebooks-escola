import { useCallback, useState } from 'react';
import { turmaService } from '../services/turmaService';

export function useTurmas() {
  const [turmas, setTurmas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const clearMessages = useCallback(() => {
    setError('');
    setSuccess('');
  }, []);

  const fetchTurmas = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await turmaService.getAll();
      setTurmas(data);
    } catch (err) {
      setError(
        err?.message || 'Erro ao carregar as turmas.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreate = useCallback(async (data) => {
    setIsLoading(true);

    try {
      const novaTurma = await turmaService.create(data);

      setTurmas((prev) => [...prev, novaTurma]);

      setSuccess('Turma cadastrada com sucesso.');

      return novaTurma;
    } catch (err) {
      setError(
        err?.message || 'Erro ao cadastrar turma.'
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleUpdate = useCallback(async (id, data) => {
    setIsLoading(true);

    try {
      const turmaAtualizada = await turmaService.update(
        id,
        data
      );

      if (!turmaAtualizada) {
        throw new Error('Turma não encontrada.');
      }

      setTurmas((prev) =>
        prev.map((turma) =>
          turma.id === id ? turmaAtualizada : turma
        )
      );

      setSuccess('Turma atualizada com sucesso.');

      return turmaAtualizada;
    } catch (err) {
      setError(
        err?.message || 'Erro ao atualizar turma.'
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (id) => {
    setIsLoading(true);

    try {
      await turmaService.delete(id);

      setTurmas((prev) =>
        prev.filter((turma) => turma.id !== id)
      );

      setSuccess('Turma removida com sucesso.');
    } catch (err) {
      setError(
        err?.message || 'Erro ao remover turma.'
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
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