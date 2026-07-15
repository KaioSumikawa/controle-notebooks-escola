import { useCallback, useEffect, useState } from 'react';
import { notebookService } from '../services/notebookService';

export function useNotebooks() {
  const [notebooks, setNotebooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const fetchNotebooks = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const data = await notebookService.getAll();
      setNotebooks(data);
    } catch (err) {
      setError(err?.message || 'Erro ao carregar os notebooks.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotebooks();
  }, [fetchNotebooks]);

  const handleCreate = async (data) => {
    setIsLoading(true);
    clearMessages();

    try {
      const novoNotebook = await notebookService.create(data);

      setNotebooks((prev) => [...prev, novoNotebook]);

      setSuccess('Notebook cadastrado com sucesso.');

      return novoNotebook;
    } catch (err) {
      setError(err?.message || 'Erro ao cadastrar notebook.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (id, data) => {
    setIsLoading(true);
    clearMessages();

    try {
      const notebookAtualizado = await notebookService.update(id, data);

      if (!notebookAtualizado) {
        throw new Error('Notebook não encontrado.');
      }

      setNotebooks((prev) =>
        prev.map((notebook) =>
          notebook.id === id ? notebookAtualizado : notebook
        )
      );

      setSuccess('Notebook atualizado com sucesso.');

      return notebookAtualizado;
    } catch (err) {
      setError(err?.message || 'Erro ao atualizar notebook.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    clearMessages();

    try {
      await notebookService.delete(id);

      setNotebooks((prev) =>
        prev.filter((notebook) => notebook.id !== id)
      );

      setSuccess('Notebook removido com sucesso.');
    } catch (err) {
      setError(err?.message || 'Erro ao remover notebook.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    notebooks,
    isLoading,
    error,
    success,
    fetchNotebooks,
    handleCreate,
    handleUpdate,
    handleDelete,
    clearMessages,
  };
}