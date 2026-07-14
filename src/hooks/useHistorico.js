import { useState, useCallback } from 'react';
import { historicoService } from '../services/historicoService';

export function useHistorico() {
  const [historico, setHistorico] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const clearMessages = useCallback(() => {
    setError('');
    setSuccess('');
  }, []);


  // Buscar histórico
  const fetchHistorico = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const data = await historicoService.getAll();

      setHistorico(data);
    } catch (err) {
      setError(
        err?.message || 'Erro ao carregar histórico.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);


  // Criar registro no histórico
  const handleCreate = useCallback(async (data) => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const novoRegistro = await historicoService.create(data);

      setHistorico((prev) => [
        novoRegistro,
        ...prev,
      ]);

      setSuccess(
        'Registro adicionado ao histórico.'
      );

      return novoRegistro;

    } catch (err) {
      setError(
        err?.message || 'Erro ao criar registro.'
      );

      throw err;

    } finally {
      setIsLoading(false);
    }
  }, []);


  // Atualizar registro
  const handleUpdate = useCallback(async (id, data) => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const registroAtualizado =
        await historicoService.update(id, data);


      setHistorico((prev) =>
        prev.map((item) =>
          item.id === id
            ? registroAtualizado
            : item
        )
      );


      setSuccess(
        'Histórico atualizado com sucesso.'
      );


      return registroAtualizado;

    } catch (err) {
      setError(
        err?.message || 'Erro ao atualizar histórico.'
      );

      throw err;

    } finally {
      setIsLoading(false);
    }
  }, []);


  // Remover registro
  const handleDelete = useCallback(async (id) => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await historicoService.delete(id);


      setHistorico((prev) =>
        prev.filter(
          (item) => item.id !== id
        )
      );


      setSuccess(
        'Registro removido do histórico.'
      );

    } catch (err) {
      setError(
        err?.message || 'Erro ao remover registro.'
      );

      throw err;

    } finally {
      setIsLoading(false);
    }
  }, []);


  return {
    historico,
    isLoading,
    error,
    success,

    fetchHistorico,

    handleCreate,
    handleUpdate,
    handleDelete,

    clearMessages,
  };
}