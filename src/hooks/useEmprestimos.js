import { useState, useCallback, useEffect } from 'react';
import { emprestimos as emprestimosIniciais } from '../data/emprestimos';

export function useEmprestimos() {
  const [emprestimos, setEmprestimos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  /**
   * Carrega os empréstimos
   * Futuramente será substituído pelo Supabase
   */
  const fetchEmprestimos = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      setEmprestimos(emprestimosIniciais);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Erro ao carregar empréstimos.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmprestimos();
  }, [fetchEmprestimos]);

  /**
   * Criar empréstimo
   */
  const handleCreate = useCallback(async (data) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      const novoEmprestimo = {
        id: Date.now().toString(),

        notebookId: data.notebook,

        professor: data.professor,

        turma: data.turma,

        dataEmprestimo: data.dataEmprestimo,

        horaEmprestimo: new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),

        dataDevolucao: null,

        horaDevolucao: null,

        status: 'ativo',

        observacao: data.observacao || '',
      };

      setEmprestimos((prev) => [novoEmprestimo, ...prev]);

      setSuccess('Empréstimo registrado com sucesso!');

      return novoEmprestimo;
    } catch (err) {
      console.error(err);
      setError(err.message || 'Erro ao registrar empréstimo.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Atualizar empréstimo
   */
  const handleUpdate = useCallback(async (id, updates) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      setEmprestimos((prev) =>
        prev.map((emprestimo) =>
          emprestimo.id === id
            ? {
                ...emprestimo,
                ...updates,
              }
            : emprestimo
        )
      );

      setSuccess('Empréstimo atualizado com sucesso!');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Erro ao atualizar empréstimo.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Excluir empréstimo
   */
  const handleDelete = useCallback(async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      setEmprestimos((prev) =>
        prev.filter((emprestimo) => emprestimo.id !== id)
      );

      setSuccess('Empréstimo removido com sucesso!');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Erro ao remover empréstimo.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Registrar devolução
   */
  const handleDevolver = useCallback(async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      const agora = new Date();

      setEmprestimos((prev) =>
        prev.map((emprestimo) =>
          emprestimo.id === id
            ? {
                ...emprestimo,
                status: 'finalizado',
                dataDevolucao: agora.toISOString().split('T')[0],
                horaDevolucao: agora.toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
              }
            : emprestimo
        )
      );

      setSuccess('Notebook devolvido com sucesso!');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Erro ao registrar devolução.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Limpa mensagens
   */
  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  return {
    emprestimos,
    isLoading,
    error,
    success,
    fetchEmprestimos,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleDevolver,
    clearMessages,
  };
}