import { downloadFile } from './downloadFile';


export function convertToCSV(
  data = []
) {
  if (!data || data.length === 0) {
    return '';
  }


  const headers = Object.keys(
    data[0]
  );


  const csvRows = [
    headers.join(';'),
  ];


  data.forEach((item) => {
    const row = headers.map(
      (header) => {
        const value = item[header] ?? '';

        return `"${String(value)
          .replace(/"/g, '""')}"`;
      }
    );


    csvRows.push(
      row.join(';')
    );
  });


  return csvRows.join('\n');
}


export function exportCSV(
  data = [],
  fileName = 'exportacao.csv'
) {
  const csv = convertToCSV(
    data
  );


  if (!csv) {
    return;
  }


  downloadFile(
    '\ufeff' + csv,
    fileName,
    'text/csv;charset=utf-8;'
  );
}


export function exportSelectedCSV(
  data = [],
  fields = [],
  fileName = 'exportacao.csv'
) {
  if (
    !data.length ||
    !fields.length
  ) {
    return;
  }


  const formattedData = data.map(
    (item) => {
      const newItem = {};

      fields.forEach((field) => {
        newItem[field] = item[field];
      });

      return newItem;
    }
  );


  exportCSV(
    formattedData,
    fileName
  );
}