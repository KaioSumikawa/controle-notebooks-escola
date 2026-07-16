/**
 * Funções auxiliares relacionadas aos notebooks.
 */

/**
 * Gera o código do notebook.
 */
export function gerarCodigoNotebook(numero) {
  return `NB-${String(numero).padStart(3, '0')}`;
}

/**
 * Gera o QR Code do notebook.
 */
export function gerarQRCode(notebook) {
  if (!notebook) {
    return '';
  }

  return (
    notebook.qrCode ||
    notebook.id ||
    gerarCodigoNotebook(notebook.numero || 1)
  );
}

/**
 * Verifica se o notebook está disponível.
 */
export function notebookDisponivel(notebook) {
  return notebook?.status === 'disponivel';
}

/**
 * Verifica se o notebook está emprestado.
 */
export function notebookEmprestado(notebook) {
  return notebook?.status === 'emprestado';
}

/**
 * Verifica se o notebook está em manutenção.
 */
export function notebookEmManutencao(notebook) {
  return notebook?.status === 'manutencao';
}

/**
 * Retorna o texto amigável do status.
 */
export function getStatusNotebook(status) {
  switch (status) {
    case 'disponivel':
      return 'Disponível';

    case 'emprestado':
      return 'Emprestado';

    case 'manutencao':
      return 'Manutenção';

    default:
      return 'Desconhecido';
  }
}

/**
 * Retorna a cor do status.
 */
export function getCorStatusNotebook(status) {
  switch (status) {
    case 'disponivel':
      return 'green';

    case 'emprestado':
      return 'blue';

    case 'manutencao':
      return 'yellow';

    default:
      return 'gray';
  }
}

/**
 * Ordena notebooks pelo número.
 */
export function ordenarNotebooks(lista = []) {
  return [...lista].sort(
    (a, b) => (a.numero || 0) - (b.numero || 0)
  );
}

/**
 * Procura um notebook pelo código.
 */
export function buscarNotebook(lista = [], codigo = '') {
  const busca = codigo.trim().toLowerCase();

  return (
    lista.find(
      (notebook) =>
        notebook.id?.toLowerCase() === busca ||
        notebook.qrCode?.toLowerCase() === busca
    ) || null
  );
}

/**
 * Filtra notebooks por status.
 */
export function filtrarPorStatus(
  lista = [],
  status = 'todos'
) {
  if (status === 'todos') {
    return lista;
  }

  return lista.filter(
    (notebook) => notebook.status === status
  );
}

/**
 * Pesquisa notebooks.
 */
export function pesquisarNotebooks(
  lista = [],
  texto = ''
) {
  const busca = texto.trim().toLowerCase();

  if (!busca) {
    return lista;
  }

  return lista.filter((notebook) =>
    [
      notebook.id,
      notebook.modelo,
      notebook.patrimonio,
      notebook.localizacao,
      notebook.observacao,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(busca)
  );
}