export function downloadFile(
  content,
  fileName,
  type = 'text/plain'
) {
  const blob = new Blob(
    [content],
    {
      type,
    }
  );


  const url = URL.createObjectURL(
    blob
  );


  const link = document.createElement(
    'a'
  );

  link.href = url;
  link.download = fileName;


  document.body.appendChild(link);

  link.click();


  document.body.removeChild(link);


  URL.revokeObjectURL(url);
}


export function downloadJSON(
  data,
  fileName = 'dados.json'
) {
  const json = JSON.stringify(
    data,
    null,
    2
  );


  downloadFile(
    json,
    fileName,
    'application/json'
  );
}


export function downloadCSV(
  data,
  fileName = 'dados.csv'
) {
  if (!data || data.length === 0) {
    return;
  }


  const headers = Object.keys(
    data[0]
  );


  const rows = data.map((item) =>
    headers.map((header) =>
      `"${String(item[header] ?? '')
        .replace(/"/g, '""')}"`
    ).join(',')
  );


  const csv = [
    headers.join(','),
    ...rows,
  ].join('\n');


  downloadFile(
    csv,
    fileName,
    'text/csv;charset=utf-8;'
  );
}