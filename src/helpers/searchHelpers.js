export function normalizeSearch(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}


export function searchInText(
  text,
  search
) {
  if (!search) {
    return true;
  }

  return normalizeSearch(text)
    .includes(
      normalizeSearch(search)
    );
}


export function searchByFields(
  items = [],
  search = '',
  fields = []
) {
  if (!search) {
    return items;
  }


  return items.filter((item) =>
    fields.some((field) =>
      searchInText(
        item[field],
        search
      )
    )
  );
}


export function globalSearch(
  items = [],
  search = ''
) {
  if (!search) {
    return items;
  }


  return items.filter((item) =>
    Object.values(item).some((value) =>
      searchInText(
        value,
        search
      )
    )
  );
}


export function getSearchableText(
  item,
  fields = []
) {
  return fields
    .map((field) => item[field])
    .join(' ');
}


export function highlightSearch(
  text,
  search
) {
  if (!search || !text) {
    return text;
  }


  const normalizedSearch =
    normalizeSearch(search);


  const regex = new RegExp(
    `(${normalizedSearch})`,
    'gi'
  );


  return String(text).replace(
    regex,
    '<mark>$1</mark>'
  );
}