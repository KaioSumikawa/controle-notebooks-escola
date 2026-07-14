import { useState } from 'react';
import { emprestimos as emprestimosIniciais } from '../data/emprestimos';

export function useEmprestimos() {
  const [emprestimos, setEmprestimos] = useState(emprestimosIniciais);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const fetchEmprestimos = async () => {
    setIsLoading(true);

    try {
      // Futuramente buscará os dados do Supabase
      setEmprestimos((prev) => [...prev]);
    } catch (err) {
      setError(err?.message || 'Erro ao carregar os empréstimos.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (data) => {
    setIsLoading(true);

    try {
      let novoEmprestimo;

      setEmprestimos((prev) => {
        novoEmprestimo = {
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

        return [...prev, novoEmprestimo];
      });

      setSuccess('Empréstimo registrado com sucesso.');

      return novoEmprestimo;
    } catch (err) {
      setError(err?.message || 'Erro ao registrar empréstimo.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (id, data) => {
    setIsLoading(true);

    try {
      setEmprestimos((prev) =>
        prev.map((emprestimo) =>
          emprestimo.id === id
            ? {
                ...emprestimo,
                ...data,
              }
            : emprestimo
        )
      );

      setSuccess('Empréstimo atualizado com sucesso.');
    } catch (err) {
      setError(err?.message || 'Erro ao atualizar empréstimo.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true);

    try {
      setEmprestimos((prev) =>
        prev.filter((emprestimo) => emprestimo.id !== id)
      );

      setSuccess('Empréstimo removido com sucesso.');
    } catch (err) {
      setError(err?.message || 'Erro ao remover empréstimo.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDevolver = async (id) => {
    setIsLoading(true);

    try {
      const hoje = new Date();

      const dataDevolucao = hoje.toISOString().split('T')[0];

      const horaDevolucao = hoje.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });

      setEmprestimos((prev) =>
        prev.map((emprestimo) =>
          emprestimo.id === id
            ? {
                ...emprestimo,
                status: 'finalizado',
                dataDevolucao,
                horaDevolucao,
              }
            : emprestimo
        )
      );

      setSuccess('Notebook devolvido com sucesso.');
    } catch (err) {
      setError(err?.message || 'Erro ao registrar devolução.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

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