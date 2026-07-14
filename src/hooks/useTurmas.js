import { useState, useCallback, useEffect } from 'react';
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


  // Buscar turmas
  const fetchTurmas = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const data = await turmaService.getAll();

      setTurmas(data);
    } catch (err) {
      setError(
        err?.message || 'Erro ao carregar turmas.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);


  // Criar turma
  const handleCreate = useCallback(async (data) => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const novaTurma = await turmaService.create(data);

      setTurmas((prev) => [
        ...prev,
        novaTurma,
      ]);

      setSuccess('Turma criada com sucesso.');

      return novaTurma;

    } catch (err) {
      setError(
        err?.message || 'Erro ao criar turma.'
      );

      throw err;

    } finally {
      setIsLoading(false);
    }
  }, []);


  // Atualizar turma
  const handleUpdate = useCallback(async (id, data) => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const turmaAtualizada = await turmaService.update(
        id,
        data
      );

      setTurmas((prev) =>
        prev.map((turma) =>
          turma.id === id
            ? turmaAtualizada
            : turma
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


  // Excluir turma
  const handleDelete = useCallback(async (id) => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await turmaService.delete(id);

      setTurmas((prev) =>
        prev.filter(
          (turma) => turma.id !== id
        )
      );

      setSuccess('Turma excluída com sucesso.');

    } catch (err) {
      setError(
        err?.message || 'Erro ao excluir turma.'
      );

      throw err;

    } finally {
      setIsLoading(false);
    }
  }, []);


  // Carrega automaticamente ao abrir a página
  useEffect(() => {
    fetchTurmas();
  }, [fetchTurmas]);


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