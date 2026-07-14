import { useState } from 'react';
import { notebooks as notebooksIniciais } from '../data/notebooks';

export function useNotebooks() {
  const [notebooks, setNotebooks] = useState(notebooksIniciais);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const fetchNotebooks = async () => {
    setIsLoading(true);

    try {
      // Futuramente buscará do Supabase
      setNotebooks((prev) => [...prev]);
    } catch (err) {
      setError(err?.message || 'Erro ao carregar os notebooks.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (data) => {
    setIsLoading(true);

    try {
      const numero = notebooks.length + 1;

      const novoNotebook = {
        id: `NB-${String(numero).padStart(3, '0')}`,
        numero,
        qrCode: `NB-${String(numero).padStart(3, '0')}`,
        ativo: true,
        dataCadastro: new Date().toISOString(),
        responsavel: '',
        turma: '',
        status: data.status ?? 'disponivel',
        modelo: data.modelo ?? '',
        patrimonio: data.patrimonio ?? '',
        localizacao: data.localizacao ?? '',
        observacao: data.observacao ?? '',
      };

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

    try {
      setNotebooks((prev) =>
        prev.map((notebook) =>
          notebook.id === id
            ? {
                ...notebook,
                ...data,
              }
            : notebook
        )
      );

      setSuccess('Notebook atualizado com sucesso.');
    } catch (err) {
      setError(err?.message || 'Erro ao atualizar notebook.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true);

    try {
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