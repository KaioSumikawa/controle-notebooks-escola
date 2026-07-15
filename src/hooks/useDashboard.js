import { useMemo } from 'react';
import { useNotebooks } from './useNotebooks';
import { useEmprestimos } from './useEmprestimos';

export function useDashboard() {
  const {
    notebooks = [],
    isLoading: notebooksLoading,
  } = useNotebooks();

  const {
    emprestimos = [],
    isLoading: emprestimosLoading,
  } = useEmprestimos();

  const dados = useMemo(() => {
    const totalNotebooks = notebooks.length;

    const notebooksDisponiveis = notebooks.filter(
      (notebook) => notebook.status === 'disponivel'
    ).length;

    const notebooksEmprestados = notebooks.filter(
      (notebook) => notebook.status === 'emprestado'
    ).length;

    const notebooksManutencao = notebooks.filter(
      (notebook) => notebook.status === 'manutencao'
    ).length;

    const emprestimosAtivos = emprestimos.filter(
      (emprestimo) => emprestimo.status === 'ativo'
    );

    const ultimosEmprestimos = [...emprestimos]
      .sort((a, b) => {
        const dataA = new Date(
          `${a.dataEmprestimo} ${a.horaEmprestimo || '00:00'}`
        );

        const dataB = new Date(
          `${b.dataEmprestimo} ${b.horaEmprestimo || '00:00'}`
        );

        return dataB - dataA;
      })
      .slice(0, 5);

    return {
      totalNotebooks,
      notebooksDisponiveis,
      notebooksEmprestados,
      notebooksManutencao,
      emprestimosAtivos,
      ultimosEmprestimos,
    };
  }, [notebooks, emprestimos]);

  return {
    ...dados,
    notebooks,
    emprestimos,
    isLoading: notebooksLoading || emprestimosLoading,
  };
}