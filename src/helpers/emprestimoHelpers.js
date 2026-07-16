/**
 * Funções auxiliares para empréstimos.
 */

/**
 * Verifica se o empréstimo está ativo.
 */
export function emprestimoAtivo(emprestimo) {
  return emprestimo?.status === 'ativo';
}

/**
 * Verifica se o empréstimo foi finalizado.
 */
export function emprestimoFinalizado(emprestimo) {
  return emprestimo?.status === 'finalizado';
}

/**
 * Verifica se está atrasado.
 */
export function emprestimoAtrasado(emprestimo) {
  return emprestimo?.status === 'atrasado';
}

/**
 * Retorna o texto amigável do status.
 */
export function getStatusEmprestimo(status) {
  switch (status) {
    case 'ativo':
      return 'Ativo';

    case 'finalizado':
      return 'Finalizado';

    case 'atrasado':
      return 'Atrasado';

    case 'cancelado':
      return 'Cancelado';

    default:
      return 'Desconhecido';
  }
}

/**
 * Retorna uma cor para o status.
 */
export function getCorStatusEmprestimo(status) {
  switch (status) {
    case 'ativo':
      return 'blue';

    case 'finalizado':
      return 'green';

    case 'atrasado':
      return 'red';

    case 'cancelado':
      return 'gray';

    default:
      return 'gray';
  }
}

/**
 * Pesquisa empréstimos.
 */
export function pesquisarEmprestimos(
  lista = [],
  texto = ''
) {
  const busca = texto.trim().toLowerCase();

  if (!busca) {
    return lista;
  }

  return lista.filter((emprestimo) =>
    [
      emprestimo.notebookId,
      emprestimo.professor,
      emprestimo.turma,
      emprestimo.observacao,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(busca)
  );
}

/**
 * Filtra por status.
 */
export function filtrarEmprestimos(
  lista = [],
  status = 'todos'
) {
  if (status === 'todos') {
    return lista;
  }

  return lista.filter(
    (emprestimo) =>
      emprestimo.status === status
  );
}

/**
 * Ordena por data de empréstimo (mais recente primeiro).
 */
export function ordenarEmprestimos(
  lista = []
) {
  return [...lista].sort((a, b) => {
    const dataA = new Date(
      `${a.dataEmprestimo} ${a.horaEmprestimo || '00:00'}`
    );

    const dataB = new Date(
      `${b.dataEmprestimo} ${b.horaEmprestimo || '00:00'}`
    );

    return dataB - dataA;
  });
}

/**
 * Retorna apenas empréstimos ativos.
 */
export function somenteAtivos(
  lista = []
) {
  return lista.filter(
    (emprestimo) =>
      emprestimo.status === 'ativo'
  );
}

/**
 * Retorna apenas devoluções.
 */
export function somenteFinalizados(
  lista = []
) {
  return lista.filter(
    (emprestimo) =>
      emprestimo.status === 'finalizado'
  );
}

/**
 * Conta empréstimos por status.
 */
export function contarPorStatus(
  lista = []
) {
  return {
    ativos: lista.filter(
      (e) => e.status === 'ativo'
    ).length,

    finalizados: lista.filter(
      (e) => e.status === 'finalizado'
    ).length,

    atrasados: lista.filter(
      (e) => e.status === 'atrasado'
    ).length,

    cancelados: lista.filter(
      (e) => e.status === 'cancelado'
    ).length,
  };
}

/**
 * Localiza um empréstimo pelo ID.
 */
export function buscarEmprestimo(
  lista = [],
  id = ''
) {
  return (
    lista.find(
      (emprestimo) =>
        emprestimo.id === id
    ) || null
  );
}

/**
 * Calcula quantos dias um notebook permaneceu emprestado.
 */
export function calcularDiasEmprestado(
  emprestimo
) {
  if (!emprestimo?.dataEmprestimo) {
    return 0;
  }

  const inicio = new Date(
    emprestimo.dataEmprestimo
  );

  const fim = emprestimo.dataDevolucao
    ? new Date(
        emprestimo.dataDevolucao
      )
    : new Date();

  const diferenca =
    fim.getTime() - inicio.getTime();

  return Math.max(
    0,
    Math.ceil(
      diferenca /
        (1000 * 60 * 60 * 24)
    )
  );
}