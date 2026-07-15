import { useCallback, useEffect, useState } from 'react';
import { emprestimoService } from '../services/emprestimoService';

export function useDevolucoes() {
  const [devolucoes, setDevolucoes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const fetchDevolucoes = useCallback(async () => {
    setIsLoading(true);

    try {
      const emprestimos = await emprestimoService.getAll();

      const ativos = emprestimos.filter(
        (emprestimo) => emprestimo.status === 'ativo'
      );

      setDevolucoes(ativos);
    } catch (err) {
      setError(err?.message || 'Erro ao carregar devoluções.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDevolucoes();
  }, [fetchDevolucoes]);

  const registrarDevolucao = async (id) => {
    setIsLoading(true);
    clearMessages();

    try {
      const devolucao = await emprestimoService.devolver(id);

      if (!devolucao) {
        throw new Error('Empréstimo não encontrado.');
      }

      await fetchDevolucoes();

      setSuccess('Devolução registrada com sucesso.');

      return devolucao;
    } catch (err) {
      setError(err?.message || 'Erro ao registrar devolução.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    devolucoes,
    isLoading,
    error,
    success,
    fetchDevolucoes,
    registrarDevolucao,
    clearMessages,
  };
}