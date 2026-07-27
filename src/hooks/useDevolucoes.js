import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { emprestimoService } from '../services/emprestimoService';

export function useDevolucoes() {
  const [devolucoes, setDevolucoes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  /**
   * Limpa mensagens
   */
  const clearMessages = useCallback(() => {
    setError('');
    setSuccess('');
  }, []);

  /**
   * Carrega empréstimos ativos
   * (que representam devoluções pendentes)
   */
  const fetchDevolucoes = useCallback(async () => {
    try {
      setIsLoading(true);
      clearMessages();

      const emprestimos =
        await emprestimoService.getAll();

      const ativos = emprestimos.filter(
        (emprestimo) =>
          emprestimo.status === 'ativo'
      );

      setDevolucoes(ativos);
    } catch (err) {
      console.error(err);

      setError(
        err?.message ||
          'Erro ao carregar devoluções.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [clearMessages]);

  useEffect(() => {
    fetchDevolucoes();
  }, [fetchDevolucoes]);

  /**
   * Registrar devolução
   */
  const registrarDevolucao = useCallback(
    async (id) => {
      try {
        setIsLoading(true);
        clearMessages();

        const devolucao =
          await emprestimoService.devolver(id);

        if (!devolucao) {
          throw new Error(
            'Empréstimo não encontrado.'
          );
        }

        await fetchDevolucoes();

        setSuccess(
          'Devolução registrada com sucesso.'
        );

        return devolucao;
      } catch (err) {
        console.error(err);

        setError(
          err?.message ||
            'Erro ao registrar devolução.'
        );

        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [clearMessages, fetchDevolucoes]
  );

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