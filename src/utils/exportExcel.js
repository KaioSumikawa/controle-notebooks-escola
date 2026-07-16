import * as XLSX from 'xlsx';

/**
 * Exporta uma lista de objetos para Excel (.xlsx)
 *
 * @param {Array} data
 * @param {String} fileName
 * @param {String} sheetName
 */
export function exportExcel(
  data = [],
  fileName = 'relatorio.xlsx',
  sheetName = 'Relatório'
) {
  if (!Array.isArray(data) || data.length === 0) {
    console.warn(
      'Nenhum dado disponível para exportação.'
    );
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    sheetName
  );

  XLSX.writeFile(workbook, fileName);
}

/**
 * Exporta um único objeto para Excel.
 */
export function exportExcelObject(
  object = {},
  fileName = 'dados.xlsx',
  sheetName = 'Dados'
) {
  const rows = Object.entries(object).map(
    ([campo, valor]) => ({
      Campo: campo,
      Valor: valor,
    })
  );

  const worksheet =
    XLSX.utils.json_to_sheet(rows);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    sheetName
  );

  XLSX.writeFile(workbook, fileName);
}

/**
 * Exporta várias planilhas em um único arquivo.
 *
 * Exemplo:
 * exportMultipleSheets({
 *   Notebooks: notebooks,
 *   Professores: professores,
 *   Empréstimos: emprestimos
 * });
 */
export function exportMultipleSheets(
  sheets = {},
  fileName = 'relatorio.xlsx'
) {
  const workbook = XLSX.utils.book_new();

  Object.entries(sheets).forEach(
    ([sheetName, data]) => {
      const worksheet =
        XLSX.utils.json_to_sheet(data);

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        sheetName
      );
    }
  );

  XLSX.writeFile(workbook, fileName);
}