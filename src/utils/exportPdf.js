import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Exporta qualquer lista de objetos para PDF.
 *
 * @param {Array} data
 * @param {String} fileName
 * @param {String} title
 */
export function exportPdf(
  data = [],
  fileName = 'relatorio.pdf',
  title = 'Relatório'
) {
  const pdf = new jsPDF();

  pdf.setFontSize(18);
  pdf.text(title, 14, 18);

  pdf.setFontSize(10);
  pdf.text(
    `Gerado em: ${new Date().toLocaleString('pt-BR')}`,
    14,
    26
  );

  if (!Array.isArray(data) || data.length === 0) {
    pdf.text('Nenhum dado encontrado.', 14, 40);
    pdf.save(fileName);
    return;
  }

  const columns = Object.keys(data[0]);

  const rows = data.map((item) =>
    columns.map((column) => {
      const value = item[column];

      if (value === null || value === undefined) {
        return '';
      }

      if (typeof value === 'object') {
        return JSON.stringify(value);
      }

      return String(value);
    })
  );

  autoTable(pdf, {
    head: [columns],
    body: rows,
    startY: 35,
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [37, 99, 235],
      textColor: 255,
    },
  });

  pdf.save(fileName);
}

/**
 * Exporta um único objeto.
 */
export function exportPdfObject(
  object,
  fileName = 'dados.pdf',
  title = 'Informações'
) {
  const pdf = new jsPDF();

  pdf.setFontSize(18);
  pdf.text(title, 14, 18);

  pdf.setFontSize(10);

  let y = 35;

  Object.entries(object).forEach(([key, value]) => {
    pdf.text(
      `${key}: ${value ?? ''}`,
      14,
      y
    );

    y += 8;
  });

  pdf.save(fileName);
}